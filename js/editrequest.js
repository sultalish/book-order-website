
let searchRequestUrl = './src/searchrequest.php';
let deleteBookUrl = './src/deletebook.php';
let deleteRequestUrl = './src/deleterequest.php';
let editBookUrl = './src/editbook.php';

var jsonArray, i, professor_id;
function listbooks(id) {
    'use strict';
    var requestYear = document.getElementById("year");
    var requestSemester = document.getElementById("semester");
     document.getElementById("error").innerHTML = "";
    var List = document.getElementById("booklist");
    List.innerHTML = "";

     professor_id = id;
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
    var searchItem = 0;
   console.log(searchItem);
    var jsonPayload = '{"professorid" : "' + professor_id + '", "semester" : "' + requestSemester + '", "year" : "' + requestYear + '"}';
    
   

    var request = new XMLHttpRequest();
    request.open("POST", productUrl, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               jsonArray = JSON.parse(request.responseText);
               var id=0;
                       
                for (i = 0; i < jsonArray.length; i++) {
                var editButton =` <button type="button" id="editBook" class="btn btn-default" data-toggle="modal" data-target="#editBookModal" onclick="setIndex(${i});"> 
                Edit
                </button>`;
                var deleteButton =` <button type="button" id="deleteBook" class="btn btn-default" onclick="setIndex(${i});">
                Delete
                </button>`;   
                var row = ` <div class="card card-body"> 
                    <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row"> 
                                                
                        <div class="media-body"> 
                            <h6 class="media-title font-weight-semibold"> ${jsonArray[i].ISBN} | $ ${jsonArray[i].title} </h6>                           
                            <p class="mb-3">${jsonArray[i].author} </p>
                            <p class="mb-3">${jsonArray[i].publisher} </p> 
 
                            <ul class="list-inline list-inline-dotted mb-0"> 
                                <li class="list-inline-item">
                                <p class="mb-3">${jsonArray[i].bookedition}  </p>

                                </li>                                 
                            </ul>                             
                        </div>     
                        <li class="list-inline-item"> 
                                                                                                
                            
                            <div class="text-muted">| ${jsonArray[i].classID} </div>
                        </li> 
                        <li>
                            ${editButton} &nbsp; ${deleteButton}
                         </li>                       
                        </div>                        
                    </div>                     
                </div> `;                

                 List.innerHTML += row; 

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

// function setIndex(i, id){

//     index = i;

//     document.getElementById("customerId").innerHTML = "";
//     document.getElementById("productName").innerHTML =  "";
//     document.getElementById("productId").innerHTML =  "";
//     document.getElementById("productDescription").innerHTML =  "";
//     document.getElementById("errortext").innerHTML = "";


  
//   /* console.log(i);
//     console.log(jsonArray[index].customer_name);
//     console.log(jsonArray[index].product_name);
//     console.log(jsonArray[index].rating);
//     console.log(jsonArray[index].review_description); */

//     document.getElementById("customerId").innerHTML = customer_id;
//     document.getElementById("customerId").style.color = "gray";
//     document.getElementById("productId").innerHTML = jsonArray[index].product_id;
//     document.getElementById("productId").style.color = "gray";

//     document.getElementById("productName").innerHTML = jsonArray[index].product_name;
//     document.getElementById("productName").style.color = "black";

//     document.getElementById("productDescription").innerHTML = jsonArray[index].product_descrip;
//     document.getElementById("productDescription").style.color = "black";


//     document.getElementById('imageFrame1').src = jsonArray[index].product_image;

// }

// function addNewReview(){

//  "use strict";
    
//     var customerid = document.getElementById("customerId").innerHTML;
//     var productid = document.getElementById("productId").innerHTML;
//     var reviewtext = document.getElementById("reviewBox").value;
    
//     document.getElementById("customerId").innerHTML = "";
//     document.getElementById("productId").innerHTML = "";
//     document.getElementById("reviewBox").value = "";
//     document.getElementById("errortext").innerHTML = "";

//   var ratingValue = $("input:radio[name=ratings]:checked").val()

//        /* console.log(productid);
//          console.log(customerid);
//           console.log(reviewtext);
//            console.log(ratingValue);*/

//  if (reviewText(reviewtext))
//     {
        
//         var json1 = '{"customer_id" : "' + customerid + '", "product_id" : "' + productid + '", "review_description" : "' + reviewtext + '", "rating" : "' + ratingValue + '"}';
       
//         var request1 = new XMLHttpRequest();
//         request1.open("POST", addReviewtUrl, true);
//         request1.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//         try {
//             request1.onreadystatechange = function()
//         {
//             if (this.readyState == 4 && this.status == 200)
//             {    
//                 var jsonObject1 = JSON.parse(request1.responseText);
//                 var endpointmsg = jsonObject1['msg'];
//                 var errormsg = endpointmsg
//                 //console.log(errormsg);
//                 if (errormsg === "done")
//                     {
//                         document.getElementById("errortext").innerHTML = "Thank you.<br> Review added successfully";
//                         document.getElementById("errortext").style.color = "green";                       

//                         document.getElementById("reviewBox").value = "";

//                         $("input:radio[name='ratings']").each(function(i) {
//                              this.checked = false;
//                                     });
//                 }

//                 if (errormsg === "ItemAlreadyreviewed")
//                     {
//                        document.getElementById("errortext").innerHTML = "Product already reviewed! <br> Please check you product list.";
//                        document.getElementById("errortext").style.color = "red";
//                        $("input:radio[name='ratings']").each(function(i) {
//                              this.checked = false;
//                                     });

//                 }
//             }
//         };
//             request1.responseType="text";
//             request1.send(json1);
//         }
//         catch(error)
//         {
//             document.getElementById("errortext").innerHTML = error.message;
//             document.getElementById("errortext").style.color = "red";
//         }
//     }

// }


// function reviewText(text)
// {
//     "use strict";
    
//     text = text.toLowerCase();
//     var arrayText = text.split(" ");
//     var arrayBadWords = ["fuck", "shit","asshole"];
    
//     if (text.length < 4)
//     {
//         document.getElementById("errortext").innerHTML = "Please write something about the Item!";
//         document.getElementById("errortext").style.color = "red";
//         return false;
//     }

//         var foundBadWords = arrayText.filter(arrayText => arrayBadWords.includes(arrayText));

//         console.log(foundBadWords);
//     if (foundBadWords.length > 0){
//         document.getElementById("errortext").innerHTML = "Please avoid bad words! " + foundBadWords.join(", ");
//         document.getElementById("errortext").style.color = "red";
//         return false;
//     } 
    
//     return true;
// }