
<?php
  require_once('dbconnect.php');

  $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $fullName = $inputFromJson['fullName'];
    $password =  $inputFromJson['password'];
    $phoneNumber = $inputFromJson['phoneNumber'];
    $email = $inputFromJson['email'];
    $sql;
    
    //$confirmCode = rand(100000, 1000000);
    //echo($fullName);

    //Start Reading Sequence
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
       else
       {
        $sql = "INSERT INTO professor (fullname, email, passCode, phoneNum) 
        VALUES ('". $fullName ."','". $email ."','". $password ."','". $phoneNumber ."');";
    
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
  
  
