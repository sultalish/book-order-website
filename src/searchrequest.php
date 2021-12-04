<?php
	
 	require_once('dbconnect.php');
     $inputFromJson = json_decode(file_get_contents('php://input'), true);

     $professorid = $inputFromJson['professorid'];
     $semester =  $inputFromJson['semester'];
     $year = $inputFromJson['year'];
     $sql;

    
    $searchResults = "{";
    $searchCount = 0;
	

    $sql = " SELECT `book`.`ISBN`, `book`.`title`, `book`.`author`, `book`.`bookedition`, `book`.`publisher`,
 `request`.`classID`
   FROM
            `book`
       AND `request`
    WHERE
        (`book`.`ISBN` = `request`.`ISBN`AND `request`.`professorID` =  '".$profesorid."' AND `request`.`semester` =  '".$semester."' AND `request`.`year` =  '".$year."')
        ORDER BY ISBN DESC ;";


     
    


    if ($conn->connect_error) 
	{
		returnError( $conn->connect_error );
	} 
	else
	{
		
         $result = $conn->query($sql);
        if (!$result) {
            trigger_error('Invalid query: ' . $conn->error);
        }
        if ($result->num_rows > 0)
        {
            while($row = $result->fetch_assoc())
            {
                if( $searchCount > 0 )
                {
                    $searchResults .= ",{";
                }
                $searchCount++;
                $searchResults .= '"ISBN":';
                        $searchResults .= '"' . $row["ISBN"] . '",';
                $searchResults .= '"title":';
                        $searchResults .= '"' . $row["title"] . '",';
                $searchResults .= '"author":';
                         $searchResults .= '"' . $row["author"] . '",';
                $searchResults .= '"bookedition":';
                        $searchResults .= '"' . $row["bookedition"] . '",';
                $searchResults .= '"publisher":';
                        $searchResults .= '"' . $row["publisher"] . '",';
               
                $searchResults .= '"classID":';
                        $searchResults .= '"' . $row["classID"] .  '"}';
                
            }
            returnInfo( $searchResults );
            
        }
        else
        {
            returnError( "No Books Found" );
        }

        $result -> free_result();
		$conn->close();
        
	}

    
    
	function returnError($error){
        $retval = '{"msg":"' .$error.'"}';
		outputJson($retval);
	}
	
	function returnInfo( $searchResults )
	{
		$retval = '['.$searchResults.']';
		outputJson( $retval );
	}
	
	function outputJson ($file){
		header("Content-type:application/json");
		echo $file;
	}