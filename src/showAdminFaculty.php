<?php
    // echo "THIS IS PHP PAGE";
    require_once('dbconnect.php');

    if ($con->connect_error)
    {
        error( $con->connect_error);
    }
    else
    {
        $sql = "SELECT email FROM admin";

        if ($result = mysqli_query($con, $sql))
        {
            $msg="";
            while ($row=mysqli_fetch_row($result))
            {
                if ($row[0] != "alishersultangazin@gmail.com")
                {
                    $msg.=' <tr>
                    <td id="'.$row[0].'">'.$row[0].'</td>
                    <td id="'.$row[0].'"> <button type="button" class="cancelbtn" id="'.$row[0].'" onclick="delete_admin(id);">Delete</button> </td>
                    </tr>';
                }
            }
            echo $msg;
        }
        $con->close();
    } 
?>