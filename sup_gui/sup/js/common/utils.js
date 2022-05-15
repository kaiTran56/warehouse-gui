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
        '<button class="accordion-button bi bi-calendar2-check" type="button" data-bs-toggle="collapse"'+
            'data-bs-target="#collapse'+data.id+'" aria-expanded="true"'+
            'aria-controls="collapse'+data.id+'"> '+'_'+
            data.nextTimeRelease+'_'+data.statusOrderSchedule+
        '</button>'+
    '</h2>'+
    '<div id="collapse'+data.id+'" class="accordion-collapse collapse"'+
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
};

let setToken = (token) =>{
    localStorage.setItem(LocalStorageParam.TOKEN.name, token);
}

let redirectPage = (url) =>{
    window.location.href = url;
}

let requestLogin = ()=>{
    let token = localStorage.getItem(LocalStorageParam.TOKEN.name);
    if(token===null){
        redirectPage(DIRECT_LOGIN);
    }
}

let removeToken = ()=>{
    localStorage.removeItem(LocalStorageParam.TOKEN.name);
}

let logout = ()=>{
    $('#logout').click(()=>{
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: LOGOUT_URL,
            data: "data",
            headers: { Authorization: 'Bearer '+TOKEN },
            dataType: "json",
            success: (response) => {

            },
            error: (err) => {
                toastr["warning"]("ERROR", err);
            }
        });
        removeToken();
        redirectPage(DIRECT_LOGIN);
    });
    
}

let expiredToken = (err)=>{
    if(err.status==401) {
        toastr["warning"](AUTHENTICATION,"ERROR");
        removeToken();redirectPage(DIRECT_LOGIN);
    }
}

let getUserInfo = () =>{

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_CURR_USER,
        data: "data",
        headers: { Authorization: 'Bearer '+TOKEN },
        dataType: "json",
        success: (response) => {
            console.log(response);
            $('#username').text(response.name);
            $('#emailInfo').text(response.email);
            $('#usernameInfo').text(response.name);
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
};


let refuseAuthentication = (err)=>{
    if(err.status==403) {
        toastr["warning"](AUTHENTICATION,"ERROR");
        redirectPage(ERROR_PAGE);
    }
}

let customToastr = (type, message, title) =>{
    toastr[type](message,title);
}

let customSuccessToastr = (err) =>{
    if(err.status==403) {
        
    }
}

let getRoles = ()=>{
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: GET_ROLES,
        data: "data",
        headers: { Authorization: 'Bearer '+TOKEN },
        dataType: "json",
        success: (response) => {
            let temp ='';
            response.listResult.map(p => {
                temp = '<option value="'+p.name+'">'+p.name+'</option>' + temp;
            });
            $('#role').html(temp);
            $('#roleReg').html(temp);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            toastr["warning"]("ERROR", err);
        }
    });
}