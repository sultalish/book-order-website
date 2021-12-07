<?php

    require_once('dbconnect.php');
    $inputFromJson = json_decode(file_get_contents('php://input'), true);
  
      $adminID = $inputFromJson['adminID'];
      $password =  $inputFromJson['password'];
      $sql;
      
      //Start Reading Sequence
     if ($con->connect_error)
      {
              error( $con->connect_error);
      }
      else
      {
        $sql = "SELECT * FROM admin WHERE adminID = '". $adminID ."';";
        $result = mysqli_query($con, $sql);
        $numRows = mysqli_num_rows($result);
          //echo $numRows;

            //Review SQL Result
          if($numRows > 0)
          {
            $query = "UPDATE admin SET passCode = '" .$password . "' WHERE adminID = '". $adminID ."';";

            if($con->query($query) != TRUE ){
              error($con->error);
            }
            else{
              // sendEmail($email, $confirmCode);
              error("passwordupdated");     
            }                   
           } //User not found
          else
            {
              error("user not found");
            }
         $con->close();  
       }


  function error($error){
          $retval = '{"msg":"' . $error .'"}';
        outputJson($retval);
  }
    
    
  function outputJson ($file){
      header("Content-type:application/json");
      echo $file;
  }
?>