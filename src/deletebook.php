<?php
	
 	require_once('dbconnect.php');
     $inputFromJson = json_decode(file_get_contents('php://input'), true);

     $professorid = $inputFromJson['professorid'];
     $semester =  $inputFromJson['semester'];
     $year = $inputFromJson['year'];
     $sql;

    
    $searchResults = "{";
    $searchCount = 0;
	

    $sql = " DELETE * FROM `request`
    WHERE
        (`book`.`ISBN` = `request`.`ISBN` AND `request`.`professorID` =  '".$professorid."' AND `request`.`semester` =  '".$semester."' AND `request`.`semyear` =  '".$year."') ;";

        
    if ($con->connect_error) 
	{
		returnError( $con->connect_error );
	} 
	else
	{
		
         $result = $con->query($sql);
        if (!$result) {
            trigger_error('Invalid query: ' . $con->error);
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
		$con->close();
        
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