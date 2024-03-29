//Code by Taoufik Laaroussi

let signUpUrl = './src/passwordReset.php';

//Function to reset professor password
function resetPassword()
{
    "use strict";

    //read cookie
    var id = readCookie();
    
    //read user input
    var password = document.getElementById("passRes").value;
    var confirmPassword = document.getElementById("confirmpassRes").value;

    document.getElementById("passRes").value = "";
    document.getElementById("confirmpassRes").value = "";
    
    document.getElementById("resPassStatus").innerHTML = "";

    //validate user input then send the json file to the backend
 if (validateInput(id, password, confirmPassword))
    {
        //hash the user passsword
        var hashedPassword = md5(password);
        //create json file to send it the backend using POST request
        var json = '{"professorID" : "' + id + '", "password" : "' + hashedPassword + '"}';
       

        //send data to backencd using POST
        var request = new XMLHttpRequest();
        request.open("POST", signUpUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                var endpointmsg = jsonObject['msg'];
                // console.log(endpointmsg);
                var errormsg = endpointmsg.split('professor.').pop();
               // console.log(errormsg);
                if (errormsg === "done")
                    {
                        
                        document.getElementById("resPassStatus").innerHTML = "Password changed successfully!";
                        document.getElementById("resPassStatus").style.color = "green"; 
                        
                        document.getElementById("passRes").value = "";
                        document.getElementById("confirmpassRes").value = "";

                     }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("resPassStatus").innerHTML = error.message;
            document.getElementById("resPassStatus").style.color = "red";
        }
    }
}

//Function to chekc password matching
function checkConfirmPassword(confirmPassword, password)
{
    if (confirmPassword !== password)
    {
        document.getElementById("resPassStatus").innerHTML = "The two passwords are not matched!";
        document.getElementById("resPassStatus").style.color = "red";
        return false;
    }
    return true;
}

//function to check password is 5 characters and less than 45
 function checkPassword(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("resPassStatus").innerHTML = "Password is required!";
        document.getElementById("resPassStatus").style.color = "red";
        return false;
    }
    if (password.length < 5)
    {
        document.getElementById("resPassStatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("resPassStatus").style.color = "red";
        return false;
    }

    return true;
}

function validateInput(id, password, confirmPassword )
{
    "use strict";
    if(id <= 0) return false;
    if (!checkPassword(password)) return false;
    if (!checkConfirmPassword(confirmPassword, password)) return false;
       
    return true;
}