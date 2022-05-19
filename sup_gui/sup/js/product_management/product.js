let dataTable = $('#prodManagementTbl').DataTable();
let objDetail = {
    id: '',
    length: '',
    nameProduct: '',
    pod: {},
    price: '',
    qrCode: '',
    quantity: '',
    status: '',
    width: '',
    height: '',
    urlImage: '',
};

$(document).ready(() => {
    requestLogin();
    toastrConfig();
    getUserInfo();
    dataTable = $('#prodManagementTbl').DataTable({
        scrollY: '80vh',
        scrollCollapse: true,
        scrollX: true,
        responsive: true,
        order: [[0, "desc"]],
        columns: [
            { title: "ID", data: "id", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "QR-Code", data: "qrCode", defaultContent: "-", className: " txt-truncate" },
            { title: "Name", data: "nameProduct", defaultContent: "-", className: "txt-truncate" },
            { title: "Height", data: "height", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Length", data: "length", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Width", data: "width", defaultContent: "-", className: "text-center txt-truncate" },
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
                    return '<button id="delete_' + data + '" value="' + data + '" title="delete" type="button" class="btn btn-danger btn-sm bi bi-file-earmark-excel">' + '' +
                        '</button>' + '<button id="detail_' + data + '" value="' + data + '" title="detail" type="button" class="btn btn-warning btn-sm bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#detailProductMdl">' + '' + '</button>';
                }
            },
        ]
    });
    logout();
    search();
    getDetailAction();

});

let getDetailAction = () => {
    $('#prodManagementTbl').on('click', 'button', (e) => {
        e.preventDefault();
        let valueBtn = e.target.value;
        let idBtn = e.target.id;
        if (idBtn.includes(ACTION.DETAIL.name)) {
            showDetailInfo(valueBtn);
            console.log(valueBtn);
            saveChange(valueBtn);
        } else if (idBtn.includes(ACTION.DELETE.name)) {
            deleteProduct(valueBtn);
        }
    });

}
///////////////////////////////////////////////////////////////////////////////////////////
let saveChange = (id) => {

    $('#saveEditProd').click((e) => {
        console.log(id);
        objDetail.id = id;
        objDetail.qrCode = ($('#qrCodeEdit').val());
        objDetail.quantity =  $('#quantityEdit').val();
        objDetail.nameProduct = $('#nameProduct').val();
        objDetail.pod = JSON.parse($('#qrPodCode').val());
        objDetail.width= $('#widthEdit').val();
        objDetail.height = $('#heightEdit').val();
        objDetail.length = $('#lengthEdit').val();
        objDetail.urlImage = $('#imageProduct').attr('src');
        console.log(objDetail);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: SAVE_PRODUCT,
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

//////////////////////////////////////////////////////////////////////////////////////////
let showDetailInfo = (id) => {
    getPods();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_PRODUCT + id,
        data: "data",
        headers: { Authorization: 'Bearer ' + TOKEN },
        dataType: "json",
        success: (response) => {
            console.log(response);
            injectProduct(response);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"](err.responseJSON.message, "ERROR");
            refuseAuthentication(err);
            expiredToken(err);
        }
    });
}

let injectProduct = (response) => {
    $('#qrCodeEdit').val(response.qrCode);
    $('#quantityEdit').val(response.quantity);
    $('#nameProduct').val(response.nameProduct);
    $('#imageProduct').attr('src' ,response.urlImage);
    $('#qrPodCode').val(JSON.stringify(response.pod));
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
        url: GET_PRODUCTS,
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
let deleteProduct = (id) => {
    var result = confirm(DELETE_QUESTION);
    if (result) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: DELETE_PRODUCT + id,
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
                    toastr["success"](SUCCESS_MSG, "SUCCESS");
                } else if(err.status == 400) {
                    toastr["warning"](err.responseText, "ERROR");
                }else {
                    toastr["warning"](err.responseText, "ERROR");
                }
                search();
            }
        });
    } else {
        // the user clicked cancel or closed the confirm dialog.
    }
}

let getPods = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_PODS,
        data: "data",
        dataType: "json",
        headers: { Authorization: 'Bearer ' + TOKEN },
        success: (response) => {
            console.log(response);
            let temp ='';
            response.listResult.map(p => {
                temp = "<option value='"+JSON.stringify(p)+"'>"+p.qrCode+"</option>" + temp;
            });
            $('#qrPodCode').html(temp);
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