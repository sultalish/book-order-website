<?php
	
 	require_once('dbconnect.php');
     $inputFromJson = json_decode(file_get_contents('php://input'), true);
     $isbn = $inputFromJson['isbn'];
     $professorid = $inputFromJson['professorid'];
     $semester =  $inputFromJson['semester'];
     $year = $inputFromJson['year'];
     $sql1;
     $sql2;
      
if ($con->connect_error)
{
    error( $con->connect_error);
}
else
{
    $sql1 = " DELETE FROM `book`
    WHERE
        (`book`.`isbn` =  '".$isbn."');";
    
    $sql2 = " DELETE FROM `request`
    WHERE
        (`request`.`professorID` =  '".$professorid."' AND `request`.`isbn` =  '".$isbn."' AND `request`.`semester` =  '".$semester."' AND `request`.`semyear` =  '".$year."');";
}
if($con->query($sql1) != TRUE && $con->query($sq2) != TRUE )
{
  returnError( $con->error );
}
else
{
  returnInfo("done");
}
$con->close();
   

function returnError($error){
$retval = '{"msg":"' . $error .'"}';
outputJson($retval);
}

function returnInfo($info){
$retval = '{"msg":"' . $info .'"}';
outputJson($retval);
}

function outputJson ($file){
header("Content-type:application/json");
echo $file;
}
	