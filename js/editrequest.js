
let searchRequestUrl = './src/searchrequest.php';
let deleteBookUrl = './src/deletebook.php';
let deleteRequestUrl = './src/deleterequest.php';
let editBookUrl = './src/editbook.php';

var jsonArray, i, professor_id;
function listbooks() {
    'use strict';
    var requestYear = document.getElementById("year").value;
    var requestSemester = document.getElementById("semester").value;
     document.getElementById("error").innerHTML = "";
    var List = document.getElementById("booklist");
    List.innerHTML = "";

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
    // professor_id = "123";
    console.log(professor_id);
//     var searchItem = 0;
//    console.log(searchItem);
    var jsonPayload = '{"professorid" : "' + professor_id + '", "semester" : "' + requestSemester + '", "year" : "' + requestYear + '"}';
    
   

    var request = new XMLHttpRequest();
    request.open("POST", searchRequestUrl, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               jsonArray = JSON.parse(request.responseText);
               //var id=0;

               console.log(jsonArray);
                       
                for (i = 0; i < jsonArray.length; i++) {
                var editButton =` <button type="button" id="editBook" class="btn btn-default" data-toggle="modal" data-target="#editBookModal" onclick="setIndex(${i});"> 
                Edit
                </button>`;
                var deleteButton =` <button type="button" id="deleteBook" class="btn btn-default" onclick="setIndex2(${i});">
                Delete
                </button>`;   
                var row = ` <div class="card card-body"> 
                    <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row"> 
                                                
                        <div class="media-body"> 
                            <p class="mb-3">ISBN:  ${jsonArray[i].ISBN} </p>
                            <p class="mb-3">Book Title: ${jsonArray[i].title} </p>
                            <p class="mb-3">Author: ${jsonArray[i].author} </p>
                            <p class="mb-3">Publisher: ${jsonArray[i].publisher} </p> 
                            <p class="mb-3">Edition: ${jsonArray[i].bookedition} </p> 
                            <p class="mb-3">Class ID: ${jsonArray[i].classID} </p> 
                                                       
                        </div>     
                        
                        <li>
                            ${editButton} &nbsp; ${deleteButton}
                         </li>                       
                        </div>                        
                    </div>                     
                </div> `;                

                booklist.innerHTML += row; 

                }
            
            

                
                if (jsonArray.msg === "No Books Found") 
                    document.getElementById("error").innerHTML = jsonArray.msg;


            }
        }
        request.responseType = "text";
       request.send(jsonPayload);


    }
    catch (error) {
        document.getElementById("error").innerHTML = error.message;
        document.getElementById("error").style.color = "red";
    }
}

function setIndex(i, id){
    index = i;

    document.getElementById("editISBN").innerHTML = "";
    document.getElementById("editTitle").value = "";
    document.getElementById("editAuthor").value = "";
    document.getElementById("editEdition").value = "";
    document.getElementById("editPublisher").value = "";
   


  
//   console.log(i);
//     console.log(jsonArray[index].ISBN);
//     console.log(jsonArray[index].titl);
//     console.log(jsonArray[index].author);
//     console.log(jsonArray[index].edition);

    document.getElementById("editISBN").innerHTML = jsonArray[index].ISBN;
    document.getElementById("editISBN").style.color = "gray";
    document.getElementById("editTitle").value = jsonArray[index].title;
    document.getElementById("editAuthor").value = jsonArray[index].author;
    document.getElementById("editEdition").value = jsonArray[index].bookedition;
    document.getElementById("editPublisher").value = jsonArray[index].publisher;



}
function setIndex2(i){
    index = i;

    var deleteISBN = jsonArray[index].ISBN;

    deleteBook(deleteISBN);
}

function editBook(){
    'use strict';
   var editISBN = document.getElementById("editISBN").innerHTML;
    var editTitle = document.getElementById("editTitle").value;
    var editAuthor = document.getElementById("editAuthor").value;
    var editEdition = document.getElementById("editEdition").value;
    var editPublisher = document.getElementById("editPublisher").value;

    
     document.getElementById("error").innerHTML = "";

    
    var jsonPayload2 = '{"isbn" : "' + editISBN + '", "title" : "' + editTitle + '","author" : "' + editAuthor + '", "edition" : "' + editEdition + '", "publisher" : "' + editPublisher + '"}';
    
   

    var request = new XMLHttpRequest();
        request.open("POST", editBookUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                var endpointmsg = jsonObject['msg'];
                // console.log(endpointmsg);
                var errormsg = endpointmsg.split('book.').pop();
               // console.log(errormsg);
                if (errormsg === "done")
                    {
                        document.getElementById("editBookStatus").innerHTML = "Book is changed successfully!";
                        document.getElementById("editBookStatus").style.color = "green";                       

                        document.getElementById("editISBN").innerHTML = "";
                        document.getElementById("editTitle").value = "";
                        document.getElementById("editAuthor").value = "";
                        document.getElementById("editEdition").value = "";
                        document.getElementById("editPublisher").value = "";
                    }

                if (errormsg !== "done")
                    {
                       document.getElementById("editBookStatus").innerHTML = "Book does not exist";
                       document.getElementById("editBookStatus").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(jsonPayload2);
        }
        catch(error)
        {
            document.getElementById("editBookStatus").innerHTML = error.message;
            document.getElementById("editBookStatus").style.color = "red";
        }

}


function deleteBook(deletebookisbn) {
    'use strict';
    var deleteBook = deletebookisbn;
    var requestYear = document.getElementById("year").value;
    var requestSemester = document.getElementById("semester").value;
     document.getElementById("error").innerHTML = "";

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
     //professor_id = "123";
    console.log(requestSemester);
//     var searchItem = 0;
//    console.log(searchItem);
    var jsonPayload3 = '{"professorid" : "' + professor_id + '", "isbn" : "' + deleteBook + '", "semester" : "' + requestSemester + '", "year" : "' + requestYear + '"}';
    
   

    var request = new XMLHttpRequest();
        request.open("POST",deleteBookUrl, true);
        request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            request.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {    
                var jsonObject = JSON.parse(request.responseText);
                var endpointmsg = jsonObject['msg'];
                // console.log(endpointmsg);
                var errormsg = endpointmsg.split('book.').pop();
               // console.log(errormsg);
                if (errormsg === "done")
                    {
                        document.getElementById("error").innerHTML = "Book is removed from request!";
                        document.getElementById("error").style.color = "green";                       

                  document.getElementById("booklist").innerHTML= "";

                }

                if (errormsg !== "done")
                    {
                       document.getElementById("error").innerHTML = "Request does not exist";
                       document.getElementById("error").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(jsonPayload3);
        }
        catch(error)
        {
            document.getElementById("error").innerHTML = error.message;
            document.getElementById("error").style.color = "red";
        }
    }


function deleteRequest() {
    'use strict';
    var requestYear = document.getElementById("year").value;
    var requestSemester = document.getElementById("semester").value;
     document.getElementById("error").innerHTML = "";

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
     //professor_id = "123";
    console.log(requestSemester);
//     var searchItem = 0;
//    console.log(searchItem);
    var jsonPayload2 = '{"professorid" : "' + professor_id + '", "semester" : "' + requestSemester + '", "year" : "' + requestYear + '"}';
    
   

    var request = new XMLHttpRequest();
        request.open("POST",deleteRequestUrl, true);
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
                        document.getElementById("error").innerHTML = "Request is deleted successfully!";
                        document.getElementById("error").style.color = "green";                       

                  document.getElementById("booklist").innerHTML= "";

                }

                if (errormsg !== "done")
                    {
                       document.getElementById("error").innerHTML = "Request does not exist";
                       document.getElementById("error").style.color = "red"; 
                }
            }
        };
            request.responseType="text";
            request.send(jsonPayload2);
        }
        catch(error)
        {
            document.getElementById("error").innerHTML = error.message;
            document.getElementById("error").style.color = "red";
        }
    }
