let dataTable = $('#example').DataTable();
let objDetail = null;
let query = {
    phone: "",
    productCode: ""
}
let updateStatusObj = {
    id: '',
    customerNote: '',
    productNote: '',
    statusOrderSchedule: '',
}
$(document).ready(() => {
    toastrConfig();
    dataTable = $('#example').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[6, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "txt-truncate" },
            { title: "Name", data: "customerName", defaultContent: "-", className: " txt-truncate" },
            { title: "Phone", data: "phone", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Product Code", data: "productCode", defaultContent: "-", className: " txt-truncate" },
            { title: "Product Name.", data: "productName", defaultContent: "-", className: " txt-truncate" },
            { title: "Status Order Schedule", data: "statusOrderSchedule", defaultContent: "-", className: " txt-truncate" },
            { title: "Time Release", data: "timeRelease", defaultContent: "-", className: " txt-truncate" },
            { title: "Next Time Release", data: "nextTimeRelease", defaultContent: "-", className: " txt-truncate" },
            { title: "Actions" }
        ],
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4, 5, 6, 7],
                render: (data, type, row, meta) => {
                    return data ? '<td" title="' + data + '">' + data + '</td>' : '-';
                }
            },
            {
                targets: [8],
                data: 'id',
                render: (data, type, row, meta) => {
                    return '<button id="detail_' + data + '" value="' + data + '" title="show"  type="button" class="btn bi bi-chat-right-dots  btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#detailOrderSchedule">' + '' + '</button>' +
                        '<button id="done_' + data + '" value="' + data + '" title="done" type="button" class="btn btn-success btn-sm bi bi-check2-circle" data-bs-toggle="modal" data-bs-target="#noteOrderSchedule">' + '' + '</button>' +
                        '<button id="deny_' + data + '" value="' + data + '" title="deny" type="button" class="btn btn-danger btn-sm bi bi-file-earmark-excel" data-bs-toggle="modal" data-bs-target="#noteOrderSchedule">' + '' +
                        '</button>' + '<button id="note_' + data + '" value="' + data + '" title="note" type="button" class="btn btn-warning btn-sm bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#noteOrderSchedule">' + '' + '</button>';
                }
            },
        ]
    });
    search();
    getDetailAction();


});

let getDetailAction = () => {
    $('#example').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        removeLocalStorage();
        if (idBtn.includes(ACTION.SHOW.name)) {
            showDetailInfo(valueBtn);
        } else if (idBtn.includes(ACTION.DONE.name)) {

            showNoteOrderSchedule(valueBtn, ACTION.DONE.name);
            getChangedNote(STATUS.COMPLETE.name);
        } else if (idBtn.includes(ACTION.DENY.name)) {

            showNoteOrderSchedule(valueBtn, ACTION.DENY.name);
            getChangedNote(STATUS.DENY.name);
        } else if (idBtn.includes(ACTION.NOTE.name)) {

            showNoteOrderSchedule(valueBtn, null);
            getChangedNote(null);
        }
    });
    saveChangeNote();
}
///////////////////////////////////////////////////////////////////////////////////////////
let saveChangeNote = () => {

    $('#saveNoteOrderSchedule').click((e) => {
        updateStatusObj.id = localStorage.getItem(LocalStorageParam.ID_SCHEDULE.name);
        updateStatusObj.customerNote = localStorage.getItem(LocalStorageParam.CUSTOMER_NOTE.name);
        updateStatusObj.productNote = localStorage.getItem(LocalStorageParam.PRODUCT_NOTE.name);
        updateStatusObj.statusOrderSchedule = localStorage.getItem(LocalStorageParam.STATUS_ORDER_SCHEDULE.name);
        // console.log(updateStatusObj);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: UPDATE_ORDER_SCHEDULE,
            data: JSON.stringify(updateStatusObj),
            dataType: "json",
            success: (response) => {
                // console.log(response);
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                console.log(err);
                toastr["warning"]("ERROR", err);
            }
        });
        search();

    });

}
let getChangedNote = (status) => {
    if (status === null) {
        localStorage.setItem(LocalStorageParam.STATUS_ORDER_SCHEDULE.name, STATUS.WAITING.name);
    } else {
        localStorage.setItem(LocalStorageParam.STATUS_ORDER_SCHEDULE.name, status);
    }
    let obj = JSON.parse(localStorage.getItem(LocalStorageParam.SCHEDULE_TEMP.name));


    $('#customerNoteOrderSchedule').change((e) => {
        localStorage.setItem(LocalStorageParam.CUSTOMER_NOTE.name, e.target.value);
    })
    $('#productNoteOrderSchedule').change((e) => {
        localStorage.setItem(LocalStorageParam.PRODUCT_NOTE.name, e.target.value);
    })

}


//////////////////////////////////////////////////////////////////////////////////////////
let showDetailInfo = (id) => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_DETAIL_ORDER_SCHEDULE + id,
        data: "data",
        dataType: "json",
        success: (response) => {
            query.phone = response.phone;
            query.productCode = response.productCode;
            showListDetailSchedulesInfo(query);
            $('#detailOrderScheduleHeader').html('Detail Order: ' + response.orderCode);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}

let showListDetailSchedulesInfo = (query) => {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: GET_LIST_DETAIL_ORDER_SCHEDULES,
        data: JSON.stringify(query),
        dataType: "json",
        success: (response) => {
            let temp = '';
            console.log(response.listResult);
            response.listResult.map(p => {
                temp = detailInfoComponent(p) + temp;
            });
            $('#detailOrderScheduleAccor').html(temp);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}

let showNoteOrderSchedule = (id, status) => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_DETAIL_ORDER_SCHEDULE + id,
        data: "data",
        dataType: "json",
        success: (response) => {
            localStorage.setItem(LocalStorageParam.SCHEDULE_TEMP.name, JSON.stringify(response));
            $('#customerNoteOrderSchedule').val(response.customerNote);
            $('#productNoteOrderSchedule').val(response.customerNote);
            setOrScheLocalStorage(response);
            $('#noteOrderScheduleModal').html('Note Order Code: ' + response.orderCode);
            $('#statusOrderScheduleModal').html('Status: ' + (status === null ?
                response.statusOrderSchedule : (status === ACTION.DONE.name ? ACTION.DONE.name : ACTION.DENY.name)));
            $('#customerNoteOrderSchedule').val(response.customerNote);
            $('#productNoteOrderSchedule').val(response.productNote);
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}

let search = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_ORDER_SCHEDULES,
        data: "data",
        dataType: "json",
        success: (response) => {
            dataTable.clear();
            dataTable.rows.add(response.listResult).draw();
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });

}

let setOrScheLocalStorage = (data) => {
    localStorage.setItem(LocalStorageParam.ID_SCHEDULE.name, data.id);
    // localStorage.setItem(LocalStorageParam.STATUS_ORDER_SCHEDULE.name, data.statusOrderSchedule);
    localStorage.setItem(LocalStorageParam.CUSTOMER_NOTE.name, data.customerNote);
    localStorage.setItem(LocalStorageParam.PRODUCT_NOTE.name, data.productNote);
}

let removeLocalStorage = () => {
    localStorage.removeItem(LocalStorageParam.STATUS_ORDER_SCHEDULE.name);
    localStorage.removeItem(LocalStorageParam.SCHEDULE_TEMP.name);
    localStorage.removeItem(LocalStorageParam.ID_SCHEDULE.name);
    localStorage.removeItem(LocalStorageParam.CUSTOMER_NOTE.name);
    localStorage.removeItem(LocalStorageParam.PRODUCT_NOTE.name);
}

