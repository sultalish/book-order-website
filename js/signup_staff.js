//Code by Alisher Sultangazin

let signUpUrl = './src/signup_staff.php';

function reset_add_new_admin() {
    document.getElementById("new_admin_useremail").value = "";
    document.getElementById("new_admin_password").value = "";
    document.getElementById("new_admin_confirmpassword").value = "";
}

function signup_new_admin()
{
    "use strict";
    
    var email = document.getElementById("new_admin_useremail").value;
    var password = document.getElementById("new_admin_password").value;
    var confirmPassword = document.getElementById("new_admin_confirmpassword").value;
    
    document.getElementById("new_admin_useremail").innerHTML = "";
    document.getElementById("new_admin_password").innerHTML = "";
    document.getElementById("new_admin_confirmpassword").innerHTML = "";


 if (validateInput(email, password, confirmPassword))
    {
        var hashedPassword = md5(password);
        var json = '{"password" : "' + hashedPassword + '", "email" : "' + email + '"}';
       
        var request = new XMLHttpRequest();
        request.open("POST", signUpUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                // var endpointmsg = jsonObject['msg'];
                var endpointmsg = jsonObject['msg'];
                // console.log(endpointmsg);
                var errormsg = endpointmsg.split('admin.').pop();
               // console.log(errormsg);
                if (errormsg === "done")
                    {
                        document.getElementById("upstatus_staff").innerHTML = "Created account successfully!";
                        document.getElementById("upstatus_staff").style.color = "green";                       

                        document.getElementById("new_admin_password").value = "";
                        document.getElementById("new_admin_confirmpassword").value = "";
                        document.getElementById("new_admin_useremail").value = "";
                }

                if (errormsg !== "done")
                    {
                       document.getElementById("upstatus_staff").innerHTML = "Email already used";
                       document.getElementById("upstatus_staff").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(json);

            window.location.href = "staff_panel.html";
        }
        catch(error)
        {
            document.getElementById("upstatus_staff").innerHTML = "error.message";
            document.getElementById("upstatus_staff").style.color = "red";
        }
    }
    else {
        console.log("Passwords not the same");
    }
}

function checkConfirmPassword(confirmPassword, password)
{
    if (confirmPassword !== password)
    {
        document.getElementById("upstatus_staff").innerHTML = "The two passwords are not matched!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    return true;
}

function checkFullName(name)
{
    "use strict";
    var nameREGEX = /([A-Za-z]{2,} )([A-Za-z]{2,} )?([A-Za-z]{2,})/;
    if (name.length < 1)
    {
        document.getElementById("upstatus_staff").innerHTML = "Full name is required!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    if (!nameREGEX.test(name))
    {
        document.getElementById("upstatus_staff").innerHTML = "Please enter a valid full name!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    if (name.length > 45)
    {
        document.getElementById("upstatus_staff").innerHTML = "First Name should not exceed 45 characters!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    return true;
}

 function checkPassword(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("upstatus_staff").innerHTML = "Password is required!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    if (password.length < 5)
    {
        document.getElementById("upstatus_staff").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }

    return true;
}

function checkPhoneNumber(phoneNumber)
{
    "use strict";
    if (phoneNumber.length === 0)
    {
        document.getElementById("upstatus_staff").innerHTML = "Phone number is reuired!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }

    if (phoneNumber.length !== 10)
    {
        document.getElementById("upstatus_staff").innerHTML = "Please enter a valid phone number!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1)
    {
        if (phoneNumber.charAt(i) < '0' || phoneNumber.charAt(i) > '9')
        {
            document.getElementById("upstatus_staff").innerHTML = "Please enter a valid phone number!";
            document.getElementById("upstatus_staff").style.color = "red";
            return false;
        }
    }
    return true;
}

function checkEmail(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (email.length === 0)
    {
        document.getElementById("upstatus_staff").innerHTML = "Email is required!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    if (email.length > 45)
    {
        document.getElementById("upstatus_staff").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("upstatus_staff").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("upstatus_staff").style.color = "red";
        return false;
    }
    return true;
}

function validateInput( email, password, confirmPassword )
{
    "use strict";
    // if (!checkFullName(fullName)) return false;
    if(!checkEmail(email)) return false;
    // if (!checkPhoneNumber(phoneNumber)) return false;
    if (!checkPassword(password)) return false;
    if (!checkConfirmPassword(confirmPassword, password)) return false;
       
    return true;
}