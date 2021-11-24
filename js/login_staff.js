//Code by Alisher Sultangazin
let loginUrl = './src/login.php';


var staff_id = 0;

var loginName = "";
var password = "";
var loginPassword = "";

function login() {
    "use strict";
    var u_fullName = "";

    loginName = document.getElementById("username").value;
    password = document.getElementById("userpassword").value;
    loginPassword = md5(password);

    document.getElementById("stafflogstatus").innerHTML = "";

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
                    staff_id = jsonObject.staff_id;
                    var endpointmsg = jsonObject.error;
                    if (professor_id < 1) {
                        document.getElementById("stafflogstatus").innerHTML = endpointmsg;
                        document.getElementById("stafflogstatus").style.color = "red";
                        return;
                    }

                    u_fullName = jsonObject.fullName;
                    //console.log(customer_id);
                    saveCookie();
                    window.location.href = "dashboard.html";

                }
            };
            //console.log(jsonPayload);
            request.responseType = "text";
            request.send(jsonPayload);
        }

        catch (err) {
            document.getElementById("stafflogstatus").innerHTML = err.message;
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
        document.getElementById("stafflogstatus").innerHTML = "Password is required!";
        document.getElementById("stafflogstatus").style.color = "red";
        return false;
    }
    if (password.length < 5) {
        document.getElementById("stafflogstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("stafflogstatus").style.color = "red";
        return false;
    }

    return true;
}