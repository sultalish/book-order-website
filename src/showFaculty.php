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


    // $sql = "SELECT email, fullName FROM faculty-database";
    // $query = mysqli_query($con, $sql);
    // while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
    //     $arrayJSON = $row;
    // }
    // header('Content-Type: application/json');
    // echo json_encode($arrayJSON, JSON_PRETTY_PRINT);

    // if ($con->connect_error)
    // {
    //     error( $con->connect_error);
    // }
    // else
    // {
    //     $sql = "SELECT * FROM facultydb";

    //     $arrayJSON = "";
    //     if ($result = mysqli_query($con, $sql)) {
    //         echo $result;
    //         $tempArray = array();
    //         while ($row = $result->fetch_object()) {
    //             $tempArray = $row;
    //             array_push($arrayJSON, $tempArray);
    //         }

    //         header("Content-type:application/json");
    //         echo $arrayJSON;
    //     }


    //     $con->close();
    // }

    // $sql = "SELECT email, fullName FROM faculty-database";
    // $result = $con->query($sql);

    // if ($result->num_rows > 0) {
    //     while ($row = $result->fetch_assoc()) {
    //         echo "<tr><td>". $row["fullName"] ."</td><td>". $row["email"] ."</td></tr>";
    //     }
    //     echo "</table>";
    // }
?>
