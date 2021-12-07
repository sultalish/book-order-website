

<?php
//This code is developed by Taoufik Laaroussi
//call dbxonnect for establishing connexion with databse
require_once ('dbconnect.php');
$inputFromJson = json_decode(file_get_contents('php://input'), true);

    //Read the content of json file
    $id = $inputFromJson['professorID'];
    $password = $inputFromJson['password'];
    $sql;
 
    //Test the connexion with databse
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
        else{
            //Sql quesry to update password
            $sql = "UPDATE professor SET passCode = '".$password."' WHERE professorID = '".$id."';";
            if($con->query($sql) != TRUE )
            {
                 returnError( $con->error );
            }
             else
            {
                returnInfo("done");
            }
         $con->close();
      }    
    
 //Function to return a json file to the frontend
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