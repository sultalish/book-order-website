
<?php
//This code is developed by Taoufik Laaroussi
//call dbxonnect for establishing connexion with databse and sending emails
    require_once('dbconnect.php');
    require_once('sendmail.php');
    $inputFromJson = json_decode(file_get_contents('php://input'), true);
  
        //Read the content of json file
      $email = $inputFromJson['email'];
      $confirmCode =  $inputFromJson['PassCode'];
      $password =  $inputFromJson['password'];
      $sql;
     
      
         //Test the connexion with databse
     if ($con->connect_error)
      {
              error( $con->connect_error);
      }
      else
      {
         //Sql quesry to get the professor by email
        $sql = "SELECT * FROM professor WHERE email = '". $email ."';";
        $result = mysqli_query($con, $sql);
        $numRows = mysqli_num_rows($result);
          //echo $numRows;

            //Review SQL Result
          if($numRows > 0)
          {                  //Sql quesry to update password to designated professor
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

 //Function to return a json file to the frontend
  function error($error){
          $retval = '{"msg":"' . $error .'"}';
        outputJson($retval);
  }
    
    
  function outputJson ($file){
      header("Content-type:application/json");
      echo $file;
  }
