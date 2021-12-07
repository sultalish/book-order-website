//Code by Taoufik Laaroussi

let signUpUrl = './src/signup.php';

//function to create new professor account
function signup()
{
    "use strict";
    
    //read user input
    var email = document.getElementById("useremail").value;
    var fullname = document.getElementById("fullname").value;
    var password = document.getElementById("userpass").value;
    var confirmPassword = document.getElementById("confirmpass").value;
    var phoneNumber = document.getElementById("userphone").value;
    
    document.getElementById("upstatus").innerHTML = "";


//Validate user input
 if (validateInput(fullname, email, phoneNumber, password, confirmPassword))
    {
        //hash password
        var hashedPassword = md5(password);

        //create json file
        var json = '{"fullName" : "' + fullname + '", "password" : "' + hashedPassword + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';
       
        //send POST request to backend
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
                var errormsg = endpointmsg.split('professor.').pop();
          
               //user added successfully
                if (errormsg === "done")
                    {
                        document.getElementById("upstatus").innerHTML = "Signed UP successfully!";
                        document.getElementById("upstatus").style.color = "green";                       

                        document.getElementById("fullname").value = "";
                        document.getElementById("userpass").value = "";
                        document.getElementById("confirmpass").value = "";
                        document.getElementById("userphone").value = "";
                        document.getElementById("useremail").value = "";

                }
                //error adding a user
                if (errormsg !== "done")
                    {
                       document.getElementById("upstatus").innerHTML = "Email already used";
                       document.getElementById("upstatus").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("upstatus").innerHTML = error.message;
            document.getElementById("upstatus").style.color = "red";
        }
    }
}

//function to check matching passwords
function checkConfirmPassword(confirmPassword, password)
{
    if (confirmPassword !== password)
    {
        document.getElementById("upstatus").innerHTML = "The two passwords are not matched!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}
//check full name format
function checkFullName(name)
{
    "use strict";
    var nameREGEX = /([A-Za-z]{2,} )([A-Za-z]{2,} )?([A-Za-z]{2,})/;
    if (name.length < 1)
    {
        document.getElementById("upstatus").innerHTML = "Full name is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (!nameREGEX.test(name))
    {
        document.getElementById("upstatus").innerHTML = "Please enter a valid full name!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (name.length > 45)
    {
        document.getElementById("upstatus").innerHTML = "First Name should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}

//check password more than 5 and less than 45 characters
 function checkPassword(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("upstatus").innerHTML = "Password is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (password.length < 5)
    {
        document.getElementById("upstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }

    return true;
}

//check phone number is 10 digits
function checkPhoneNumber(phoneNumber)
{
    "use strict";
    if (phoneNumber.length === 0)
    {
        document.getElementById("upstatus").innerHTML = "Phone number is reuired!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }

    if (phoneNumber.length !== 10)
    {
        document.getElementById("upstatus").innerHTML = "Please enter a valid phone number!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1)
    {
        if (phoneNumber.charAt(i) < '0' || phoneNumber.charAt(i) > '9')
        {
            document.getElementById("upstatus").innerHTML = "Please enter a valid phone number!";
            document.getElementById("upstatus").style.color = "red";
            return false;
        }
    }
    return true;
}

//check email format
function checkEmail(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;

    if (email.length === 0)
    {
        document.getElementById("upstatus").innerHTML = "Email is required!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (email.length > 45)
    {
        document.getElementById("upstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("upstatus").innerHTML = "Please enter your email address in format:<br>mail@example.com";
        document.getElementById("upstatus").style.color = "red";
        return false;
    }
    return true;
}

//invoque all validation functions
function validateInput(fullName, email, phoneNumber, password, confirmPassword )
{
    "use strict";
    if (!checkFullName(fullName)) return false;
    if(!checkEmail(email)) return false;
    if (!checkPhoneNumber(phoneNumber)) return false;
    if (!checkPassword(password)) return false;
    if (!checkConfirmPassword(confirmPassword, password)) return false;
       
    return true;
}