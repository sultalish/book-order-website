// Code by Alisher Sultangazin
// var btn = document.getElementById("loadDB-button");

function readDB() {
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

function readDBadmins() {
    fetch("./src/showAdminFaculty.php").then(function(response) {
        console.log(typeof(response));
        return response.text();
        }).then(function(data) {
            // here is the table
            DBloaded = 1;
            document.getElementById("table-delete-admin").innerHTML += data;
        }).catch(function(err) {
        console.log ('ERRORE ', err);
    });
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
