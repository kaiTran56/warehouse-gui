$(()=>{
    toastrConfig();
    $("#loginBtn").click( (e)=> { 
        e.preventDefault();
        login();
    });
});

let login = ()=>{
    let gmail = $('#gmail').val().trim();
    let password = $('#password').val().trim();
    let obj = {
        gmail: gmail,
        password: password
    }
    console.log(SIGNIN_URL);
    console.log(obj);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: SIGNIN_URL,
        data: JSON.stringify(obj),
        dataType: "json",
        success: (response) => {
            setToken(response.accessToken);
            redirectPage(DASHBOARD);
            toastr["success"](SUCCESS_MSG, "SUCCESS");
        },
        error: (err) => {
            customToastr("warning", LOGIN_ERR, "ERROR");
            // toastr["warning"]("ERROR", err);
        }
    });
}