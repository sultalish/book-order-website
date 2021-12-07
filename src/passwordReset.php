<?php

require_once ('dbconnect.php');
$inputFromJson = json_decode(file_get_contents('php://input'), true);
    
    $id = $inputFromJson['professorID'];
    $password = $inputFromJson['password'];
    $sql;
    //echo ($id);
   //echo ($password);
    //Start Reading Sequence
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
        else{
            //query to DB
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