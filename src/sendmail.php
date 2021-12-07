

<?php
//This code is developed by Taoufik Laaroussi
//Function to send email using Xampp SMTP server
 function sendEmail($email, $confirmCode){
      
    $to_email = $email;
    $body = 'This is your default password: ' .$confirmCode;
    $subject = "default email";
    $headers = "From: Support@bookstore.com";

            mail($to_email, $subject, $body, $headers);

}

