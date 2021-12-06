//Code by Alisher Sultangazin
let loginUrl = './src/login_staff.php';


var adminID = 0;

var loginName = "";
var password = "";
var loginPassword = "";

function login_staff() {
    console.log(md5(123123));
    "use strict";
    var staff_email = "";

    loginName = document.getElementById("staff_username").value;
    password = document.getElementById("staffpassword").value;
    loginPassword = md5(password);

    document.getElementById("logstatus").innerHTML = "";

    if (checkEmaillog(loginName) && checkPasswordlog(password)) {
        loginPassword = md5(password);
        var jsonPayload = '{"userName" : "' + loginName + '", "password" : "' + loginPassword + '"}';

        var request = new XMLHttpRequest();
        request.open("POST", loginUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(request);

                    var jsonObject = JSON.parse(request.responseText);
                    adminID = jsonObject.adminID;
                    var endpointmsg = jsonObject.error;
                    if (adminID < 1) {
                        document.getElementById("logstatus").innerHTML = endpointmsg;
                        document.getElementById("logstatus").style.color = "red";
                        return;
                    }

                    staff_email = jsonObject.email;
                    //console.log(customer_id);
                    saveCookie();
                    window.location.href = "staff_panel.html";

                }
            };
            //console.log(jsonPayload);
            request.responseType = "text";
            request.send(jsonPayload);
        }

        catch (err) {
            document.getElementById("logstatus").innerHTML = err.message;
        }

    }
}


function saveCookie() {
    var minutes = 100;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "adminID=" + adminID + ";expires=" + date.toGMTString();
}

function readCookie() {
    adminID = -1;
    var data = document.cookie;
    var splits = data.split(";");
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");

        if (tokens[0] == "adminID") {
            adminID = parseInt(tokens[1].trim());
        }
    }

}

function checkEmaillog(email) {
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50) {
        document.getElementById("logstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (email.length === 0) {
        document.getElementById("logstatus").innerHTML = "Email is required!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email)) {
        document.getElementById("logstatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    return true;
}


function checkPasswordlog(password) {
    "use strict";
    if (password.length === 0) {
        document.getElementById("logstatus").innerHTML = "Password is required!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (password.length < 5) {
        document.getElementById("logstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }

    return true;
}

function logout_staff() {
    adminID = 0;
    document.cookie = "adminID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "./login_staff.html";
}
