<?php
    // echo "THIS IS PHP PAGE";
    require_once('dbconnect.php');

    if ($con->connect_error)
    {
        error( $con->connect_error);
    }
    else
    {
        $sql = "SELECT email, fullName  FROM facultydb";

        if ($result = mysqli_query($con, $sql))
        {
            $msg="";
            while ($row=mysqli_fetch_row($result))
            {
                $msg.=' <tr>
                <td>'.$row[0].'</td>
                <td>'.$row[1].'</td>
                </tr>';
            }
            echo $msg;
        }
        $con->close();
    } 
?>