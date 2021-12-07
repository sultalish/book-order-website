<?php
	
 	require_once('dbconnect.php');
     $inputFromJson = json_decode(file_get_contents('php://input'), true);

     $isbn = $inputFromJson['isbn'];
     $title =  $inputFromJson['title'];
     $edition = $inputFromJson['edition'];
     $author = $inputFromJson['author'];
     $publisher = $inputFromJson['publisher'];

     $sql;
      
if ($con->connect_error)
{
    error( $con->connect_error);
}
else
{
    $sql = " UPDATE `book`
    SET
        `book`.`title` =  '".$title."' , `book`.`bookedition` =  '".$edition."' , `book`.`author` =  '".$author."' , `book`.`publisher` =  '".$publisher."' 
        WHERE  `book`.`ISBN` =  '".$isbn."';";
}
if($con->query($sql) != TRUE )
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
	