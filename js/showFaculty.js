// Code by Alisher Sultangazin
function showFacultyStaff()
{
    var table = document.getElementById("table-staff-db");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = adminID;
        cell2.innerHTML = "LOL";
}

// var btn = document.getElementById("loadDB-button");
var DBloaded = 0;

function readDB() {
    if (DBloaded != 1)
    {
        fetch("./src/showFaculty.php").then(function(response) {
            console.log(typeof(response));
            return response.text();
            }).then(function(data) {
                // here is the table
                DBloaded = 1;
                document.getElementById("table-staff-db").innerHTML += data;
            }).catch(function(err) {
            console.log ('ERRORE ', err);
        });
    }
}   
//     console.log("KEK");
//     $.get("./src/showFaculty.php", function(data, status) {
//         if (status == success)
//         {
//             console.log("NICE", data);
//         }
//         else
//         {
//             console.log("error");
//         }
//     });
// }