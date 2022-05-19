let dataTable = $('#pickingManagementTbl').DataTable();

let OrderStatus = {
    id: '',
    status: ''
}

$(document).ready(() => {
    requestLogin();
    toastrConfig();
    getUserInfo();
    dataTable = $('#pickingManagementTbl').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[0, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "QR Product", data: "qrCodeProduct", defaultContent: "-", className: " txt-truncate" },
            { title: "QR Pod", data: "qrCodePod", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Status", data: "status", defaultContent: "-", className: "txt-truncate" },
            { title: "Quantity", data: "quantityProduct", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Note", data: "note", defaultContent: "-", className: "txt-truncate" },
            { title: "Completed Time", data: "completedTime", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Created Date", data: "createdDate", defaultContent: "-", className: "txt-truncate" },
            { title: "Actions", className: "text-center" }
        ],
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4, 5, 6, 7],
                render: (data, type, row, meta) => {
                    return data ? '<td" title="' + data + '">' + data + '</td>' : '-';
                }
            },
            {
                width: 5,
                targets: [8],
                data: 'id',
                render: (data, type, row, meta) => {
                    return '<button id="stowed_' + data + '" value="' + data + '" title="stowed"  type="button" class="btn bi bi-check2-circle  btn-success btn-sm" >' + '' + '</button>' +
                        '<button id="cancelled_' + data + '" value="' + data + '" title="cancelled" type="button" class="btn btn-danger btn-sm bi bi-file-earmark-excel">'  + '</button>';
                }
            },
        ]
    });
    logout();
    search();
    getDetailAction();

});

let getDetailAction = () => {
    $('#pickingManagementTbl').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        OrderStatus.id = valueBtn;

        if (idBtn.includes(OPERATION_STATUS.STOWED.name)) {
            OrderStatus.status = OPERATION_STATUS.STOWED.value;
            console.log(OrderStatus);
            changeStatus(OrderStatus, COMPLETED_QUESTION);
        } else if (idBtn.includes(OPERATION_STATUS.CANCELLED.name)) {
            OrderStatus.status = OPERATION_STATUS.CANCELLED.value;
            console.log(OrderStatus);
            changeStatus(OrderStatus, CANCELLED_QUESTION);
        }
    });

}

let saveNewOrder = ()=>{
    $('#saveOrderPicking').click((e)=>{

    });
}

let search = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_STOWING_ORDERS,
        data: "data",
        dataType: "json",
        headers: { Authorization: 'Bearer ' + TOKEN },
        success: (response) => {
            dataTable.clear();
            dataTable.rows.add(response).draw();
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            if (err.status == 0) {
                toastr["warning"](DISCONNECTION, "ERROR");
            }
            refuseAuthentication(err);
            expiredToken(err);
        }
    });

}

let changeStatus = (data, msg)=>{
    var result = confirm(msg);
    if (result) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: UPDATED_STOWING_ORDER,
            data: JSON.stringify(data),
            headers: { Authorization: 'Bearer ' + TOKEN },
            dataType: "json",
            success: (response) => {
                search();
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                console.log(err);
                if (err.status == 200) {
                    search();
                    toastr["success"](SUCCESS_MSG, "SUCCESS");
                } else {
                    toastr["warning"](err.responseText, "ERROR");
                }
                refuseAuthentication(err);
                expiredToken(err);
            }
        });
    }
}
