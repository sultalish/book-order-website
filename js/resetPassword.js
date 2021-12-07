//Code by Taoufik Laaroussi

let resetPassUpUrl = './src/resetPassword.php';

//function to reset user password ang generate a random password to be sent to the user email
function resetPassword()
{
    "use strict";
    
    //read user input
    var email = document.getElementById("username").value;

//check emai format
 if (checkResEmail(email))

    {
        //generate a random number of six digits then hash it
        var passCode = Math.floor(100000 + Math.random() * 900000);
        var hashedResPassword = md5(passCode);

        //create json file
        var json = '{"email" : "' + email + '", "PassCode" : "' + passCode + '", "password" : "' + hashedResPassword + '"}';
       
        //send the json file to backend using POST request
        var request = new XMLHttpRequest();
        request.open("POST", resetPassUpUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                //parse the backend return
                var jsonObject = JSON.parse(request.responseText);
                var errormsg = jsonObject.msg;
                console.log(errormsg);

                //case password is updated
                if (errormsg === "passwordupdated")
                    {
                        document.getElementById("logstatus").innerHTML = "Check you email for temporary password!";
                        document.getElementById("logstatus").style.color = "green";                       
                }
                //case emai provided is not foound
                if (errormsg === "Emailnotfound")
                  {
                       document.getElementById("logstatus").innerHTML = "Email not found";
                       document.getElementById("logstatus").style.color = "red"; 
                  }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("logstatus").innerHTML = error.message;
            document.getElementById("logstatus").style.color = "red";
        }
    }
}




//function to check emai validity
function checkResEmail(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (email.length === 0)
    {
        document.getElementById("logstatus").innerHTML = "Email is required!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (email.length > 45)
    {
        document.getElementById("logstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("logstatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    return true;
}