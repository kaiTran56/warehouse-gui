let dataTable = $('#userManagementTbl').DataTable();
let objDetail = {
    id: "",
    username: "",
    roles: null,
};
let saveObj = {
    id: '',
    username: '',
    gmail: '',
    password: '',
    roles: ''
}

$(document).ready(() => {
    requestLogin();
    toastrConfig();
    getUserInfo();
    dataTable = $('#userManagementTbl').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[0, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Gmail", data: "gmail", defaultContent: "-", className: " txt-truncate" },
            { title: "Name", data: "username", defaultContent: "-", className: "txt-truncate" },
            { title: "Role", data: "roles[0].name", defaultContent: "-", className: "txt-truncate" },
            { title: "Created Date", data: "createdDate", defaultContent: "-", className: "txt-truncate" },
            { title: "Updated Date", data: "modifiedDate", defaultContent: "-", className: "txt-truncate" },
            { title: "Actions", className: "text-center" }
        ],
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4, 5],
                render: (data, type, row, meta) => {
                    return data ? '<td" title="' + data + '">' + data + '</td>' : '-';
                }
            },
            {
                width: 5,
                targets: [6],
                data: 'id',
                render: (data, type, row, meta) => {
                    return '<button id="delete_' + data + '" value="' + data + '" title="delete" type="button" class="btn btn-danger btn-sm bi bi-file-earmark-excel">' + '' +
                        '</button>' + '<button id="detail_' + data + '" value="' + data + '" title="detail" type="button" class="btn btn-warning btn-sm bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#detailUserMdl">' + '' + '</button>';
                }
            },
        ]
    });
    logout();
    search();
    // getRoles();
    getDetailAction();
    registerUser();

});


let registerUser = ()=>{
    getRoles();
    $('#saveNewUser').click((e) => {
        saveObj.username = $('#usernameReg').val();
        saveObj.gmail = $('#gmailReg').val();
        saveObj.password = $('#passwordReg').val();
        saveObj.roles = [{name: $('#roleReg').val()}];
        console.log(saveObj);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: SAVE_USER,
            data: JSON.stringify(saveObj),
            headers: { Authorization: 'Bearer ' + TOKEN },
            dataType: "json",
            success: (response) => {
                search();
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                console.log(err);
                toastr["warning"]("ERROR", err);
                refuseAuthentication(err);
                expiredToken(err);
            }
        });
    });
};

let getDetailAction = () => {
    $('#userManagementTbl').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        if (idBtn.includes(ACTION.DETAIL.name)) {
            showDetailInfo(valueBtn);
            console.log(valueBtn);
            saveChange(valueBtn);
        } else if (idBtn.includes(ACTION.DELETE.name)) {
            deleteUser(valueBtn);
        }
    });

}
///////////////////////////////////////////////////////////////////////////////////////////
let saveChange = (id) => {

    $('#saveUser').click((e) => {
        console.log(id);
        objDetail.id = id;
        objDetail.username = $('#usernameAcc').val();
        objDetail.roles = [{ name: $('#role').val() }]
        console.log(objDetail);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: SAVE_USER,
            data: JSON.stringify(objDetail),
            headers: { Authorization: 'Bearer ' + TOKEN },
            dataType: "json",
            success: (response) => {
                search();
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                console.log(err);
                toastr["warning"]("ERROR", err);
                refuseAuthentication(err);
                expiredToken(err);
            }
        });
    });

}

//////////////////////////////////////////////////////////////////////////////////////////
let showDetailInfo = (id) => {
    getRoles();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_USER + id,
        data: "data",
        headers: { Authorization: 'Bearer ' + TOKEN },
        dataType: "json",
        success: (response) => {
            console.log(response);
            injectUser(response);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
            refuseAuthentication(err);
            expiredToken(err);
        }
    });
}

let injectUser = (response) => {
    $('#usernameAcc').val(response.username);
    $('#gmail').val(response.gmail);
    $('#createdBy').val(response.createdBy);
    $('#modifiedBy').val(response.modifiedBy);
    $('#createdDate').val(response.createdDate);
    $('#modifiedDate').val(response.modifiedDate);
    $('#role').val(response.roles[0].name);
}



let search = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_USERS,
        data: "data",
        dataType: "json",
        headers: { Authorization: 'Bearer ' + TOKEN },
        success: (response) => {
            console.log(response);
            dataTable.clear();
            dataTable.rows.add(response.listResult).draw();
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
/////////////////////////////////////////////////
let deleteUser = (id) => {
    var result = confirm(DELETE_QUESTION);
    if (result) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: DELETE_USER + id,
            // data: JSON.stringify(objDetail),
            headers: { Authorization: 'Bearer ' + TOKEN },
            dataType: "json",
            success: (response) => {
                search();
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                refuseAuthentication(err);
                expiredToken(err);
                console.log(err);
                if (err.status == 200) {
                    search();
                    toastr["success"](SUCCESS_MSG, "SUCCESS");
                } else {
                    toastr["warning"](err.responseText, "ERROR");
                }
    
            }
        });
    } else {
        // the user clicked cancel or closed the confirm dialog.
    } 
}
