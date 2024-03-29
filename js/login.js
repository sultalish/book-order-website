//Code by Taoufik Laaroussi
let loginUrl = './src/login.php';


var professor_id = 0;

var loginName = "";
var password="";
var loginPassword = "";

//function to login
function login()
{   
    "use strict";
	 var u_fullName = "";

     //get the input
	 loginName = document.getElementById("username").value;
	 password = document.getElementById("userpassword").value;
     loginPassword = md5(password);

	document.getElementById("logstatus").innerHTML = "";

    //if stattement to validate the input
	if(checkEmaillog(loginName) && checkPasswordlog(password)){

        //Hash user password
		 loginPassword = md5(password);

         //Create a json file in order to send it to backend
		var jsonPayload = '{"userName" : "' + loginName + '", "password" : "' + loginPassword + '"}';

        //send the json file using POST request
    	var request = new XMLHttpRequest();
	    request.open("POST", loginUrl, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{

				var jsonObject = JSON.parse(request.responseText);
                professor_id = jsonObject.professorID;
                var endpointmsg = jsonObject.error;
                if( professor_id < 1 )
		          {
			          document.getElementById("logstatus").innerHTML = endpointmsg;
                      document.getElementById("logstatus").style.color = "red";
			         return;
		          }

                u_fullName = jsonObject.fullName;
                //console.log(customer_id);
                saveCookie();
                window.location.href = "dashboard.html";

			}
		};
			//console.log(jsonPayload);
            request.responseType="text";
            request.send(jsonPayload);
        }

	   catch(err)
	   {
		document.getElementById("logstatus").innerHTML = err.message;
	   }

}
}

//Function to logout and kill the cookie
function logout()
{
	professor_id = 0;
	document.cookie = "professor_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "./index.html";
}

//Function to create cookie
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "professor_id=" + professor_id + ";expires=" + date.toGMTString();
}

//finction to read the cookie
function readCookie()
{
	professor_id = -1;
	var data = document.cookie;
	var splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");

		if( tokens[0] == "professor_id" )
		{
			professor_id = parseInt( tokens[1].trim() );
		}
	}

}

//function to check email validity
function checkEmaillog(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50)
    {
        document.getElementById("logstatus").innerHTML = "Email is too long!<br>Email should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (email.length === 0)
    {
        document.getElementById("logstatus").innerHTML = "Email is required!";
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

//function to check password length
function checkPasswordlog(password)
{
    "use strict";
    if (password.length === 0) {
        document.getElementById("logstatus").innerHTML = "Password is required!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }
    if (password.length < 5)
    {
        document.getElementById("logstatus").innerHTML = "Your password must be at least 5 characters long, should not exceed 45 characters!";
        document.getElementById("logstatus").style.color = "red";
        return false;
    }

    return true;
}