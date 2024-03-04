<?php
session_start();
$servername = "localhost";
$username = "root"; //  DB username
$password = ""; //  DB password
$dbname = "tetrix_quest"; // DB name


// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true && isset($_SESSION['id'])) {
    $userId = $_SESSION['id']; // User ID from session

    // Prepare SQL statement to select the high score for the logged-in user
    $stmt = $conn->prepare("SELECT Highscore FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    
    $result = $stmt->get_result();
    if($row = $result->fetch_assoc()) {
        echo $row['Highscore'];
    } else {
        echo 'No score yet';
    }
    $stmt->close();
} else {
    echo 'Not logged in';
}
$conn->close();
?>
