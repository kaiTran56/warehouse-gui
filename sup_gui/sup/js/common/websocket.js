var stompClient = null;

$(document).ready(function() {
    connect();
    $("#send").click(function() {
        sendMessage();
    });
});

function connect() {
    var socket = new SockJS('/our-websocket');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, function (frame) {
        // console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (message) {
            showMessage(JSON.parse(message.body).content);
        });
    });
}

function showMessage(message) {
    console.log(message);
    // message.includes("Server")&&message.length!=0&&message!=null
    //     ? toastr.info(message, "Server to User: "+new Date().toLocaleString()).css(({
    //         width: "410px",
    //         height: "90px"
    //     })):"";
    (!message.includes("Server"))&&message.length!=0&&message!=null
        ? toastr.info(message, "Anonymous User: "+new Date().toLocaleString()).css(({
            width: "410px",
            height: "90px"
        })):"";
    $("#message-box").append(
        "<div className=\"alert alert-primary\" style=\"padding: 0.10rem 0.5rem; margin-bottom: 5px\" role=\"alert\"> \n"+
        "<span className=\"badge badge-primary text-black\"><p className=\"font-italic\">"+"<strong>"+new Date().toLocaleString()+"</strong>"+"</p></span> \n"+
        "<p>"+message+"</p>"+
        "</div>"+
        "<hr>"
    );
}

function sendMessage() {
    console.log("sending message");
    stompClient.send("/ws/message", {}, JSON.stringify({
        'idVideo':localStorage.getItem("idVideo"),
        'messageContent': $("#message").val(),
        'createdDate':new Date().toLocaleString()
    }));
}