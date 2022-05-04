let dataTable = $('#example').DataTable();
let objDetail = null;
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
                    return '<button id="detail_' + data + '" value="' + data + '"  type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#detailOrderSchedule">' + 'Show' + '</button>' +
                        '<button id="done_' + data + '" value="' + data + '" type="button" class="btn btn-success btn-sm">' + 'Done' + '</button>' +
                        '<button id="deny_' + data + '" value="' + data + '" type="button" class="btn btn-danger btn-sm">' + 'Deny' +
                        '</button>' + '<button id="note_' + data + '" value="' + data + '" type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#noteOrderSchedule">' + 'Note' + '</button>';
                }
            },
        ]
    });
    search();
    getDetailAction();
    $('#saveNoteOrderSchedule').click((e) =>{ 
        e.preventDefault();
        saveChangedNote();
    });

});

let getDetailAction = () => {
    $('#example').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        if (idBtn.includes(ACTION.SHOW.name)) {
            showDetailInfo(valueBtn);
        } else if (idBtn.includes(ACTION.DONE.name)) {
            console.log('DONE');
        } else if (idBtn.includes(ACTION.DENY.name)) {
            console.log('DENY');
        } else if (idBtn.includes(ACTION.NOTE.name)) {
            showNoteOrderSchedule(valueBtn);
        }
    });
}

let saveChangedNote = () =>{
    let customerNote = $('#customerNoteOrderSchedule').val();
    let productNote = $('#productNoteOrderSchedule').val();
console.log(objDetail);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_ORDER_SCHEDULES,
        data: "data",
        dataType: "json",
        success: (response) => {
            // console.log(response);s
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}

let showDetailInfo = (id) => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_DETAIL_ORDER_SCHEDULE + id,
        data: "data",
        dataType: "json",
        success: (response) => {
            console.log(response);
            $('#detailOrderScheduleHeader').html('Detail Order: '+response.orderCode);
            $('#detailOrderScheduleAccor').html(detailInfoComponent(response));
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}

let showNoteOrderSchedule = (id)=>{
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_DETAIL_ORDER_SCHEDULE + id,
        data: "data",
        dataType: "json",
        success: (response) => {
            // console.log(response);
            objDetail = response;
            $('#noteOrderScheduleModal').html('Note Order Code: '+response.orderCode);
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

