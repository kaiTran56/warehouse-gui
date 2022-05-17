let dataTable = $('#podManagementTbl').DataTable();
let objDetail = {
    id: "",
    username: "",
    roles: null,
};
let saveObj = {
    id: '',
    qrCode: '',
    storageQuantity: '',
    width: '',
    length: '',
    height: '',
}

$(document).ready(() => {
    requestLogin();
    toastrConfig();
    getUserInfo();
    dataTable = $('#podManagementTbl').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[0, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "QR-Code", data: "qrCode", defaultContent: "-", className: " txt-truncate" },
            { title: "Storage Quantity", data: "storageQuantity", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Width", data: "width", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Height", data: "height", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Length", data: "length", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Created Date", data: "createdDate", defaultContent: "-", className: "txt-truncate" },
            { title: "Updated Date", data: "modifiedDate", defaultContent: "-", className: "txt-truncate" },
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
                    return '<button id="show_' + data + '" value="' + data + '" title="show"  type="button" class="btn bi bi-chat-right-dots  btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#listProductMdl">' + '' + '</button>' +
                        '<button id="delete_' + data + '" value="' + data + '" title="delete" type="button" class="btn btn-danger btn-sm bi bi-file-earmark-excel">' + '' +
                        '</button>' + '<button id="detail_' + data + '" value="' + data + '" title="detail" type="button" class="btn btn-warning btn-sm bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#detailPodMdl">' + '' + '</button>';
                }
            },
        ]
    });
    logout();
    search();
    getDetailAction();
    registerPod();

});


let registerPod = () => {
    getRoles();
    $('#saveNewPod').click((e) => {
        saveObj.qrCode = $('#qrCodeReg').val();
        saveObj.storageQuantity = $('#quantityReg').val();
        saveObj.width = $('#widthReg').val();
        saveObj.length = $('#lengthReg').val();
        saveObj.height = $('#heightReg').val();
        console.log(saveObj);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: SAVE_POD,
            data: JSON.stringify(saveObj),
            headers: { Authorization: 'Bearer ' + TOKEN },
            dataType: "json",
            success: (response) => {
                search();
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                toastr["warning"](err.responseJSON.message, "ERROR");
                refuseAuthentication(err);
                expiredToken(err);
            }
        });
    });
};

let getDetailAction = () => {
    $('#podManagementTbl').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        if (idBtn.includes(ACTION.DETAIL.name)) {
            showDetailInfo(valueBtn);
            console.log(valueBtn);
            saveChange(valueBtn);
        } else if (idBtn.includes(ACTION.DELETE.name)) {
            deletePod(valueBtn);
        }
        else if (idBtn.includes(ACTION.SHOW.name)) {
            showProductByPod(valueBtn);
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
                toastr["warning"](err.responseJSON.message, "ERROR");
                refuseAuthentication(err);
                expiredToken(err);
            }
        });
    });

}

let showProductByPod = (id) => {
    getRoles();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_PRODUCTS_BY_POD + id,
        data: "data",
        headers: { Authorization: 'Bearer ' + TOKEN },
        dataType: "json",
        success: (response) => {
            let temp = '';
            console.log(response);
            response.map(p => {
                temp = detailInfoProductComponent(p) + temp;
            });
            $('#detailProductPod').html(temp);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"](err.responseJSON.message, "ERROR");
            refuseAuthentication(err);
            expiredToken(err);
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////
let showDetailInfo = (id) => {
    getRoles();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_POD + id,
        data: "data",
        headers: { Authorization: 'Bearer ' + TOKEN },
        dataType: "json",
        success: (response) => {
            console.log(response);
            injectPod(response);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"](err.responseJSON.message, "ERROR");
            refuseAuthentication(err);
            expiredToken(err);
        }
    });
}

let injectPod = (response) => {
    $('#qrCodeEdit').val(response.qrCode);
    $('#quantityEdit').val(response.storageQuantity);
    $('#widthEdit').val(response.width);
    $('#heightEdit').val(response.height);
    $('#lengthEdit').val(response.length);
    $('#createdBy').val(response.createdBy);
    $('#modifiedBy').val(response.modifiedBy);
    $('#createdDate').val(response.createdDate);
    $('#modifiedDate').val(response.modifiedDate);
}



let search = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_PODS,
        data: "data",
        dataType: "json",
        headers: { Authorization: 'Bearer ' + TOKEN },
        success: (response) => {
            console.log(response.listResult);
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
let deletePod = (id) => {
    var result = confirm(DELETE_QUESTION);
    if (result) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: DELETE_POD + id,
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


let detailInfoProductComponent = (data)=>{
    return '<div class="accordion-item">'+
    '<h2 class="accordion-header" id="heading'+data.id+'">'+
        '<button class="accordion-button bi bi-archive-fill" type="button" data-bs-toggle="collapse"'+
            'data-bs-target="#collapse'+data.id+'" aria-expanded="true"'+
            'aria-controls="collapse'+data.id+'"> '+'____'+
            data.qrCode+
        '</button>'+
    '</h2>'+
    '<div id="collapse'+data.id+'" class="accordion-collapse collapse"'+
        'aria-labelledby="heading'+data.id+'" data-bs-parent="#detailProductPod">'+
        '<div class="row accordion-body">'+
            '<div class="col-5 text-wrap">'+
                '<div id="idOrder"><strong>Id: </strong>'+data.id+'</div> '+
                '<div id="createdBy"><strong>Created By: </strong>'+(data.createdBy === null ? '....' : data.createdBy) +'</div> '+
                '<div id="modifiedBy"><strong>Modified By: </strong>'+(data.modifiedBy=== null ? '....' : data.modifiedBy)+'</div> '+
                '<div id="createdDate"><strong>Created Date: </strong>'+data.createdDate+'</div> '+
                '<div id="modifiedDate"><strong>Modified Date: </strong>'+data.modifiedDate+'</div> '+
                '<div id="qrCode"><strong>QR-Code: </strong>'+data.qrCode+'</div> '+
                '<div id="nameProduct"><strong>Name: </strong>'+data.nameProduct+'</div> '+
            '</div>'+
            '<div class="col-3 text-wrap">'+
                '<div id="price"><strong>Price: </strong>'+data.price+'</div> '+
                '<div id="quantity"><strong>Quantity: </strong>'+data.quantity+'</div> '+
                '<div id="width"><strong>Width: </strong>'+data.width+'</div> '+
                '<div id="height"><strong>Height: </strong>'+data.height+'</div> '+
                '<div id="length"><strong>Length: </strong>'+data.length+'</div> '+
                '<div id="image" class="txt-truncate"><strong>Image: </strong>'+data.urlImage+'</div> '+
            '</div>'+
            '<div class="col-4 text-wrap">'+
                '<img src="'+data.urlImage+'" alt="Girl in a jacket" width="200" height="200" style="border-radius: 8px;">'+
            '</div>'+

        '</div>'+
    '</div>'+
'</div>';
};