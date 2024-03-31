<?php
session_start();
if (!isset($_SESSION['reset_email'])) {
    header('Location: forget_password.php');
    exit();
}

$message = '';

if (isset($_POST['reset'])) {
    $newPassword = $_POST['newPassword']; 
    $email = $_SESSION['reset_email'];

    // Hash the new password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Database credentials
    $servername = "localhost";
    $username = "root"; 
    $password = "";
    $dbname = "tetrix_quest"; 

    // Create database connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement to update the user's password
    $stmt = $conn->prepare("UPDATE users SET Password = ? WHERE Email = ?");
    $stmt->bind_param("ss", $hashedPassword, $email);

    // Execute the statement and check if the update was successful
    if ($stmt->execute()) {
        $message = "<p class='success'>Password reset successfully.</p>";
        unset($_SESSION['reset_email']); // Clear the email from session
        header("Refresh: 2; url=signin.php"); // Redirect to sign-in page after 2 seconds
    } else {
        $message = "<p class='error'>Error resetting password. Please try again.</p>";
    }

    $stmt->close();
    $conn->close();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
    <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <form action="reset_password.php" method="post">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <button type="submit" name="reset" class="log-btn">Reset Password</button>
        </form>
    </div>
</body>
</html>
