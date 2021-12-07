<?php

    require_once('dbconnect.php');
    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $email = $inputFromJson['email'];
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
            $sql = "DELETE FROM admin WHERE email = '".$email."';";
            if ($con->query($sql) === TRUE)
            {
                echo "Deleted successfully";
            }
            else
            {
                echo "Something went wrong" . $con->error;
            }
            echo "lol";
            $con->close();
        }
    
?>