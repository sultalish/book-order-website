<?php

 function sendEmailStaff($email, $password){
      
    $to_email = "alishersultangazin@gmail.com";
    $body = 'This is your default admin password: ' .$password;
    $subject = "New Book-order-website admin";
    $headers = "From: Support@bookstore.com";

            mail($to_email, $subject, $body, $headers);

}
?>