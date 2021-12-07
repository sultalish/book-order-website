

<?php
//This code is developed by Taoufik Laaroussi
    //Call database connexion file
    require_once('dbconnect.php');
    //Get the json file
 $inputFromJson = json_decode(file_get_contents('php://input'), true);

 //Output the content of the json file
    $email = $inputFromJson['userName'];
    $password = $inputFromJson['password'];
    $sql;
 
        //check the connexion with database
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
        else{
            //query to execute and select everything from professor table
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


    ////Function to return a json file to the frontend

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