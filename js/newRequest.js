//Code by Taoufik Laaroussi

//variable to connection with php file
let newRequestUrl = './src/newRequest.php';

//Function to create new request
function newRequest()
{
    "use strict";
    //read the cookie
    var userID = readCookie();

    //read input    
    var semester = document.getElementById("semester").value;
    var year = document.getElementById("year").value;
    var title = document.getElementById("booktitle").value;
    var author = document.getElementById("authornames").value;
    var edition = document.getElementById("edition").value;
    var publisher = document.getElementById("publisher").value;
    var isbn = document.getElementById("isbn").value;
    var classid = document.getElementById("classid").value;
    
    document.getElementById("booktitle").value = "";
    document.getElementById("authornames").value = "";
    document.getElementById("edition").value = "";
    document.getElementById("publisher").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("classid").value = "";
    document.getElementById("requestStatus").innerHTML= "";

    //validate input
 if (validateInput(isbn, classid, userID))
    {
        //create json file
        var json = '{"userid" : "' + userID + '", "semester" : "' + semester + '", "year" : "' + year + '", "title" : "' + title + '", "author" : "' + author + '", "publisher" : "' + publisher + '", "edition" : "' + edition + '", "title" : "' + title + '", "isbn" : "' + isbn + '", "classID" : "' + classid + '"}';
       
        //send the json file to backend using POST request
        var request = new XMLHttpRequest();
        request.open("POST", newRequestUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                var endpointmsg = jsonObject['msg'];
                // console.log(endpointmsg);
                var errormsg = endpointmsg.split('request.').pop();
               // console.log(errormsg);
                if (errormsg === "done")
                {

                    
                        document.getElementById("requestStatus").innerHTML = "Book and request added successfully!";
                        document.getElementById("requestStatus").style.color = "green";  
                        document.getElementById("booktitle").value = "";
                        document.getElementById("authornames").value = "";
                        document.getElementById("edition").value = "";
                        document.getElementById("publisher").value = "";
                        document.getElementById("isbn").value = "";
                        document.getElementById("classid").value = "";
                }

                if (errormsg !== "done")
                    {
                       document.getElementById("requestStatus").value = "Book Already exist in this request";
                       document.getElementById("requestStatus").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("requestStatus").value = error.message;
            document.getElementById("requestStatus").style.color = "red";
        }
    }
}

//check class id must be 3 characters or more
function checkclassID(classID)
{
    if (classID.length <= 3)
    {
        document.getElementById("requestStatus").value = "Class ID is required";
        document.getElementById("requestStatus").style.color = "red";
        return false;
    }
    return true;
}

//isbn must be no less than 3 digits
function checkisbn(isbn)
{
    "use strict";
    
    if (isbn.length <= 3)
    {
        document.getElementById("requestStatus").value = "ISBN is required";
        document.getElementById("requestStatus").style.color = "red";
        return false;
    }
    return true;
}

// check the cookie if the user is signed in
function checkuserID(userID)
{
    "use strict";
    
    if (userID <= 0 || userID === undefined)
    {
        document.getElementById("requestStatus").value = "Login is required";
        document.getElementById("requestStatus").style.color = "red";

        window.setTimeout(function(){

            window.location.href = "./login.html";
    
        }, 2500);
        
        return false;
    }
    return true;
}



function validateInput(isbn, classID, userID)
{
    "use strict";
    if (!checkisbn(isbn)) return false;
    if (!checkuserID(userID)) return false;
    if(!checkclassID(classID)) return false;
    
       
    return true;
}