//Code by Taoufik Laaroussi

let newRequestUrl = './src/newRequest.php';


function newRequest()
{
    "use strict";
    var userID = readCookie();
    
    var semester = document.getElementById("semester").value;
    var year = document.getElementById("year").value;
    var title = document.getElementById("booktitle").value;
    var author = document.getElementById("authornames").value;
    var edition = document.getElementById("edition").value;
    var publisher = document.getElementById("publisher").value;
    var isbn = document.getElementById("isbn").value;
    var classid = document.getElementById("classid").value;
    
    document.getElementById("booktitle").innerHTML = "";
    document.getElementById("authornames").innerHTML = "";
    document.getElementById("edition").innerHTML = "";
    document.getElementById("publisher").innerHTML = "";
    document.getElementById("isbn").innerHTML = "";
    document.getElementById("classid").innerHTML = "";
    document.getElementById("requestStatus").innerHTML = "";

 if (validateInput(isbn, classid, userID))
    {
        var json = '{"userid" : "' + userID + '", "semester" : "' + semester + '", "year" : "' + year + '", "title" : "' + title + '", "author" : "' + author + '", "publisher" : "' + publisher + '", "edition" : "' + edition + '", "title" : "' + title + '", "isbn" : "' + isbn + '", "classID" : "' + classid + '"}';
       
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
                        document.getElementById("requestStatus").innerHTML = "Book added successfully!";
                        document.getElementById("requestStatus").style.color = "green";                       

                        document.getElementById("booktitle").innerHTML = "";
                        document.getElementById("authornames").innerHTML = "";
                        document.getElementById("edition").innerHTML = "";
                        document.getElementById("publisher").innerHTML = "";
                        document.getElementById("isbn").innerHTML = "";
                        document.getElementById("classid").innerHTML = "";

                }

                if (errormsg !== "done")
                    {
                       document.getElementById("requestStatus").innerHTML = "Book Already exist in this request";
                       document.getElementById("requestStatus").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(json);
        }
        catch(error)
        {
            document.getElementById("requestStatus").innerHTML = error.message;
            document.getElementById("requestStatus").style.color = "red";
        }
    }
}

function checkclassID(classID)
{
    if (classID.length <= 3)
    {
        document.getElementById("requestStatus").innerHTML = "Class ID is required";
        document.getElementById("requestStatus").style.color = "red";
        return false;
    }
    return true;
}

function checkisbn(isbn)
{
    "use strict";
    
    if (isbn.length <= 3)
    {
        document.getElementById("requestStatus").innerHTML = "ISBN is required";
        document.getElementById("requestStatus").style.color = "red";
        return false;
    }
    return true;
}

function checkuserID(userID)
{
    "use strict";
    
    if (userID <= 0 || userID === undefined)
    {
        document.getElementById("requestStatus").innerHTML = "Login is required";
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