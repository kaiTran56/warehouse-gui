let toastrConfig = () =>{
    toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

let detailInfoComponent = (data)=>{
    return '<div class="accordion-item">'+
    '<h2 class="accordion-header" id="heading'+data.id+'">'+
        '<button class="accordion-button" type="button" data-bs-toggle="collapse"'+
            'data-bs-target="#collapse'+data.id+'" aria-expanded="true"'+
            'aria-controls="collapse'+data.id+'">'+
            data.nextTimeRelease+
        '</button>'+
    '</h2>'+
    '<div id="collapse'+data.id+'" class="accordion-collapse collapse show"'+
        'aria-labelledby="heading'+data.id+'" data-bs-parent="#detailOrderScheduleAccor">'+
        '<div class="row accordion-body">'+
            '<div class="col-6 text-wrap">'+
                '<div id="idOrder"><strong>Id: </strong>'+data.id+'</div> '+
                '<div id="createdBy"><strong>Created By: </strong>'+(data.createdBy === null ? '....' : data.createdBy) +'</div> '+
                '<div id="modifiedBy"><strong>Modified By: </strong>'+(data.modifiedBy=== null ? '....' : data.modifiedBy)+'</div> '+
                '<div id="createdDate"><strong>Created Date: </strong>'+data.createdDate+'</div> '+
                '<div id="modifiedDate"><strong>Modified Date: </strong>'+data.modifiedDate+'</div> '+
                '<div id="address"><strong>Address: </strong>'+data.address+'</div> '+
                '<div id="customerName"><strong>Customer Name: </strong>'+data.customerName+'</div> '+
                '<div id="customerNote"><strong>Customer Note: </strong>'+(data.customerNote === null ? '....' : data.customerNote)+'</div> '+
                '<div id="timeRelease"><strong>Time Release: </strong>'+data.timeRelease+'</div> '+
            '</div>'+
            '<div class="col-6 text-wrap">'+
                '<div id="nextTimeRelease"><strong>Next Time Release: </strong>'+data.nextTimeRelease+'</div> '+
                '<div id="phone"><strong>Phone: </strong>'+data.phone+'</div> '+
                '<div id="productCode"><strong>Product Code: </strong>'+data.productCode+'</div> '+
                '<div id="productName"><strong>Product Name: </strong>'+data.productName+'</div> '+
                '<div id="productNote"><strong>Product Note: </strong>'+data.productNote+'</div> '+
                '<div id="source"><strong>Source: </strong>'+data.source+'</div> '+
                '<div id="staff"><strong>Staff: </strong>'+data.staff+'</div>    '+
                '<div id="statusOrder"><strong>Status Order: </strong>'+data.statusOrder+'</div> '+
                '<div id="statusOrderSchedule"><strong>Status Order Schedule: </strong>'+data.statusOrderSchedule+'</div> '+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';
}