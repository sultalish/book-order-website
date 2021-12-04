


function readCookie(){

    var data = document.cookie;
        var splits = data.split(";");
        for(var i = 0; i < splits.length; i++)
        {
            var thisOne = splits[i].trim();
            var tokens = thisOne.split("=");

            if( tokens[0] == "professor_id" )
            {
              var  professorID = parseInt( tokens[1].trim() );
            }else{
              var  professorID = 0;
            }
        }
        return professorID;
}

function logout()
{
	var professor_id = 0;
	document.cookie = "professor_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "./login.html";
}