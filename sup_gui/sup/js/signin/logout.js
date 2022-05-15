$(()=>{
    toastrConfig();
    $("#loginBtn").click( (e)=> { 
        e.preventDefault();
        login();
    });
});

let logout = ()=>{
    
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: SIGNIN_URL,
        // data: JSON.stringify(obj),
        dataType: "json",
        success: (response) => {
            setToken(response.accessToken);
            redirectPage(DIRECT_ORDER_SCHEDULE);
        },
        error: (err) => {
            customToastr("warning", LOGIN_ERR, "ERROR");
            // toastr["warning"]("ERROR", err);
        }
    });
}