

<?php

    require_once('dbconnect.php');
 $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $email = $inputFromJson['userName'];
    $password = $inputFromJson['password'];
    $sql;
   // echo ($email);
   // echo ($password);
    //Start Reading Sequence
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
        else{
            //query to DB
            $sql = "SELECT * FROM professor WHERE email = '".$email."' and passCode = '".$password."';";
            $result = mysqli_query($con, $sql);
            $numRows = mysqli_num_rows($result);
            //Review SQL Result
            if($numRows > 0){
                //User found
                $user = $result->fetch_assoc();
                $id = $user["professorID"];
                $fullName = $user["fullName"];
              
                returnUser($id, $fullName);

            }
            //User not found
            else{
                error("Email or password is incorrect");
                }
            $con->close();
        }
    //FUNCTIONS

    function error($err){
        $result = '{"professorID":0, "error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($id, $fullName){
        $ret = '{"professorID":"'. $id .'", "fullName": "'. $fullName .'"}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json){
        header('Content-type: application/json');
         echo $json;
    }
        
?>