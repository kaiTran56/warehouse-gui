let dataTable = $('#userLogTbl').DataTable();

$(document).ready(() => {
    requestLogin();
    toastrConfig();
    getUserInfo();
    dataTable = $('#userLogTbl').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[0, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "User ID", data: "idUser", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Username", data: "createdBy", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Action", data: "action", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Created Date", data: "createdDate", defaultContent: "-", className: "txt-truncate" },
        ],
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4],
                render: (data, type, row, meta) => {
                    return data ? '<td" title="' + data + '">' + data + '</td>' : '-';
                }
            }
        ]
    });
    logout();
    search();

});



let search = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_USER_LOGS,
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
