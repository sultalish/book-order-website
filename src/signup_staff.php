

<?php
require_once('dbconnect.php');
require_once('sendmail-staff.php');
// MAKE UNIQUE ID WORK!

$inputFromJson = json_decode(file_get_contents('php://input'), true);

// $fullName = $inputFromJson['fullName'];
$password =  $inputFromJson['password'];
// $phoneNumber = $inputFromJson['phoneNumber'];
$email = $inputFromJson['email'];
$sql;

//$confirmCode = rand(100000, 1000000);
//echo($fullName);

//Start Reading Sequence
if ($con->connect_error) {
  error($con->connect_error);
} else {
  $newadminID = 0;
  $sql = "INSERT INTO admin (adminID, email, passCode) 
        VALUES ('" . $newadminID . "', '" . $email . "','" . $password . "');";

  if ($con->query($sql) != TRUE) {
    returnError($con->error);
  } else {
    returnInfo("done");
    sendEmailStaff($email, $password);
  }
  $con->close();
}

function returnError($error)
{
  $retval = '{"msg":"' . $error . '"}';
  outputJson($retval);
}

function returnInfo($info)
{
  $retval = '{"msg":"' . $info . '"}';
  outputJson($retval);
}

function outputJson($file)
{
  header("Content-type:application/json");
  echo $file;
}
