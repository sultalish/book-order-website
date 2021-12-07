//Code by Alisher Sultangazin


// var request = new XMLHttpRequest();
// request.open("GET", loginUrl, true);
// request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
let resetPasswordURL = './src/resetPassword-staff.php';

function reset_change_password_staff() {
    document.getElementById("change_password_staff").value = "";
    document.getElementById("change_password_staff_confirm").value = "";
}

function change_password_for_staff() {
    "use strict";

    var password = document.getElementById("change_password_staff").value;
    var confirmPassword = document.getElementById("change_password_staff_confirm").value;

    if (checkNewPassword(password) && checkConfirmNewPassword(confirmPassword, password)) {
        var hashedPassword = md5(password);
        var json = '{"password" : "' + hashedPassword + '", "adminID" : "' + adminID + '"}';

        var request = new XMLHttpRequest();
        request.open("POST", resetPasswordURL, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonObject = JSON.parse(request.responseText);
                    // var endpointmsg = jsonObject['msg'];
                    var endpointmsg = jsonObject['msg'];
                    // console.log(endpointmsg);
                    var errormsg = endpointmsg.split('admin.').pop();
                    // console.log(errormsg);
                    if (errormsg === "passwordupdated") {
                        document.getElementById("upstatus_staff_reset").innerHTML = "Changed password successfully!";
                        document.getElementById("upstatus_staff_reset").style.color = "green";

                        document.getElementById("change_password_staff").value = "";
                        document.getElementById("change_password_staff_confirm").value = "";
                    }

                    if (errormsg !== "passwordupdated") {
                        console.log(errormsg);
                        document.getElementById("upstatus_staff_reset").innerHTML = "Something went wrong!";
                        document.getElementById("upstatus_staff_reset").style.color = "red";
                    }
                }
            };
            request.responseType = "text";
            request.send(json);

            window.location.href = "staff_panel.html#change-password";
        }
        catch (error) {
            document.getElementById("upstatus_staff").innerHTML = "error.message";
            document.getElementById("upstatus_staff").style.color = "red";
        }
    }
    else {
        reset_change_password_staff();
    }
    return;
}

function checkConfirmNewPassword(confirmPassword, password) {
    if (confirmPassword !== password) {
        document.getElementById("upstatus_staff_reset").innerHTML = "The two passwords are not matched!";
        document.getElementById("upstatus_staff_reset").style.color = "red";
        return false;
    }
    return true;
}

function checkNewPassword(password) {
    "use strict";
    if (password.length === 0) {
        document.getElementById("upstatus_staff_reset").innerHTML = "Password is required!";
        document.getElementById("upstatus_staff_reset").style.color = "red";
        return false;
    }
    if (password.length < 5) {
        document.getElementById("upstatus_staff_reset").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("upstatus_staff_reset").style.color = "red";
        return false;
    }

    return true;
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

function logout_staff() {
    adminID = 0;
    document.cookie = "adminID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "./login_staff.html";
}

function delete_admin(emailToDel) {
    "use strict";

    document.getElementById("upstatus_staff_reset").innerHTML = "";

    var jsonPayload = '{"email" : "' + emailToDel + '"}';

    var request = new XMLHttpRequest();
    request.open("POST", "./src/delete_admin.php", true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        //console.log(jsonPayload);
        // request.responseType = "text";
        request.send(jsonPayload);
        document.getElementById(emailToDel).parent.innerHTML = "";
        window.location.href = "staff_panel#delete-admin"
    }

    catch (err) {
        document.getElementById("upstatus_staff_reset").innerHTML = err.message;
    }

    document.getElementById(emailToDel).parentElement.innerHTML = "";
}


window.onload = function () {
    readCookie();
    if (adminID == 0 || adminID == -1) {
        logout_staff();
    }
    // if not super admin, super admin tools are hidden
    else if (adminID != 00001) {
        document.getElementById("delete-admin-icon").style.display = 'none';
        document.getElementById("add-admin-icon").style.display = 'none';
        document.getElementById("add-admin").style.display = 'none';
        document.getElementById("delete-admin").style.display = 'none';
    }
};
