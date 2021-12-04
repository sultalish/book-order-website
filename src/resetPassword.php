<?php

    require_once('dbconnect.php');
    require_once('sendmail.php');
    $inputFromJson = json_decode(file_get_contents('php://input'), true);
  
      $email = $inputFromJson['email'];
      $confirmCode =  $inputFromJson['PassCode'];
      $password =  $inputFromJson['password'];
      $sql;
      //echo $email;
      
      //Start Reading Sequence
     if ($con->connect_error)
      {
              error( $con->connect_error);
      }
      else
      {
        $sql = "SELECT * FROM professor WHERE email = '". $email ."';";
        $result = mysqli_query($con, $sql);
        $numRows = mysqli_num_rows($result);
          //echo $numRows;

            //Review SQL Result
          if($numRows > 0)
          {
                           $query = "UPDATE professor SET passCode = '" .$password . "';";

                              if($con->query($query) != TRUE ){
                                  error($con->error);
                                }
                              else{
                              sendEmail($email, $confirmCode);
                                  error("passwordupdated");     
                                  }                   
           } //User not found
          else
            {
              error("Emailnotfound");
            }
         // $conn->close();  
       }


  function error($error){
          $retval = '{"msg":"' . $error .'"}';
        outputJson($retval);
  }
    
    
  function outputJson ($file){
      header("Content-type:application/json");
      echo $file;
  }
