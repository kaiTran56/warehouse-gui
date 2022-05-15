let importDataTbl = null;
let dataImport = null;

let getImportDataTbl = () => {

    importDataTbl = $('#importOrScheTbl').DataTable({
        scrollY: '50vh',
        scrollX: true,
        responsive: true,
        order: [[1, "desc"]],
        columns: [
            { title: "Time Release", data: "timeRelease", defaultContent: "-", className: "txt-truncate",  },
            { title: "Name", data: "customerName", defaultContent: "-", className: " txt-truncate" },
            { title: "Phone", data: "phone", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Order Code", data: "orderCode", defaultContent: "-", className: "text-center txt-truncate" },
            { title: "Product Code", data: "productCode", defaultContent: "-", className: " txt-truncate" },
        ],
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4],
                render: (data, type, row, meta) => {
                    return data ? '<td" title="' + data + '">' + data + '</td>' : '-';
                }
            },
        ]
    });

    $("#btnSubmitOrSche").click( (event)=> {
        event.preventDefault();
        importData();
    });
    saveImportOrdSche();
}

let saveImportOrdSche = ()=>{

    $("#saveImportOrScheModal").click( (event)=> {
        event.preventDefault();
        console.log(dataImport);
        if(dataImport === null){
            return ;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: SAVE_LIST_ORDER_SCHEDULES,
            data: JSON.stringify(dataImport),
            dataType: "json",
            success: (response) => {
                console.log(response);
                search();
                $('#importFileInp').val('');
                importDataTbl.rows().remove().draw();
                dataImport = null;
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            },
            error: (err) => {
                console.log(response);
                search();
                $('#importFileInp').val('');
                importDataTbl.rows().remove().draw();
                dataImport = null;
                toastr["success"](SUCCESS_MSG, "SUCCESS");
            }
        });
    });
}

let importData = () => {
    var form = $('#fileUploadOrScheForm')[0];
    var data = new FormData(form);
    $.ajax({
        url: IMPORT_DATA_ORDER_SCHEDULES,
        enctype: 'multipart/form-data',
        type: 'POST',
        data: data,
        cache: false,
        timeout: 600000,
        contentType: false,
        processData: false,
        success: (response) => {
            dataImport = response;
            importDataTbl.clear();
            importDataTbl.rows.add(response).draw();
            console.log(response);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            console.log(err);
            toastr["warning"]("ERROR", err);
        }
    })

}