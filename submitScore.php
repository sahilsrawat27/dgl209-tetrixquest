<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    // Direct database connection details
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

    $userId = $_SESSION['id']; // The user's ID from the session
    $newScore = $_POST['score']; // The score sent from the JavaScript

    // Database query to update the user's score if new score is higher
    $query = "UPDATE users SET Highscore = ? WHERE ID = ? AND Highscore < ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iii", $newScore, $userId, $newScore);
    
    if ($stmt->execute()) {
        echo "Score updated successfully.";
    } else {
        echo "Failed to update score.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "User is not logged in.";
}

?>