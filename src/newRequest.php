

<?php
//This code is developed by Taoufik Laaroussi
//call dbxonnect for establishing connexion with databse
  require_once('dbconnect.php');

  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  //Read the content of json file
    $professorID = $inputFromJson['userid'];
    $semester = $inputFromJson['semester'];
    $year = $inputFromJson['year'];
    $title = $inputFromJson['title'];
    $author = $inputFromJson['author'];
    $edition = $inputFromJson['edition'];
    $publisher =$inputFromJson['publisher'];
    $isbn = $inputFromJson['isbn'];
    $classid = $inputFromJson['classID'];

    $sqlRequest;
    $sqlBook;
    


    //Test the connexion with databse
        if ($con->connect_error)
        {
            error( $con->connect_error);
        }
       else
       {
         //Get the query ready for add a book into book table
        $sqlRequest = "INSERT INTO book (ISBN, title, author, bookedition, publisher) 
        VALUES ('". $isbn ."','". $title ."','". $author ."','". $edition ."','". $publisher ."');";
    
        if($con->query($sqlRequest) != TRUE )
        {
          returnError( $con->error );
        }
        else
        {
          //Sql quesry to add new request
            $sqlBook = "INSERT INTO request (semester, professorID, ISBN, classID, semyear) 
             VALUES ('". $semester ."','". $professorID ."','". $isbn ."','". $classid ."','". $year ."');"; 

            if($con->query($sqlBook) != TRUE )
            {
              returnError( $con->error );
            }
            else
            {
                
              returnInfo("done");
            }
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
  
  
