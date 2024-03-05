<?php
session_start();
$servername = "localhost";
$username = "root"; // DB username
$password = ""; // DB password
$dbname = "tetrix_quest"; // DB name

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL to select users and their high scores, sorted by high score
$sql = "SELECT FullName, Highscore FROM users ORDER BY Highscore DESC LIMIT 10";
$result = $conn->query($sql);

$leaderboard = [];

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
    echo json_encode($leaderboard);
} else {
    echo json_encode([]);
}

$conn->close();
?>
