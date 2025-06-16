<?php
// Include PHPMailer library
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/autoload.php';

// Set the directory containing your templates
$uploadsDir = __DIR__ . '/uploads';
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $role = $_POST['role'];
    $resumePath = '';

    // Handle file upload
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $tmpName = $_FILES['resume']['tmp_name'];
        $originalName = $_FILES['resume']['name'];
        $ext = pathinfo($originalName, PATHINFO_EXTENSION);
        $resumePath = $uploadsDir . '/' . time() . '.' . $ext;

        if (!move_uploaded_file($tmpName, $resumePath)) {
            echo "Failed to upload file.";
            exit;
        }
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
          // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtpout.secureserver.net'; // Replace with your SMTP server address
        $mail->SMTPAuth = true;
        $mail->Username = 'email'; // Replace with your SMTP username
        $mail->Password = 'paas'; // Replace with your SMTP password
        $mail->Port = 25;
        // $mail->SMTPSecure = 'tls'; // Enable TLS encryption

        // Email settings
        $mail->setFrom('email', 'Patterns Apply Now Form'); // Replace with your email and name
        $mail->addAddress('pandureddypatterns@gmail.com'); // Add recipient's email

        $mail->Subject = "New message from $name";
        $mail->isHTML(true);
        $mailContent = "<p>Name: $name</p>
                         <p>Phone: $phone</p>
                        <p>Email: $email</p>
                        <p>Message: $role</p>";
        $mail->Body = $mailContent;

        // Attach the uploaded file
        if ($resumePath) {
            $mail->addAttachment($resumePath, $originalName);
        }

        // Send the email
        if ($mail->send()) {
            echo "Email has been sent successfully.";
            header('Location: thank-you.html'); // Redirect to 'thank-you.html'
            exit;
        } else {
            echo "Email could not be sent.";
        }
    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    // Redirect to 'index.html' if accessed without POST
    header('Location: index.html');
    exit;
}
