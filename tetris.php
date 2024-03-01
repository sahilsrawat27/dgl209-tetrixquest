<?php
session_start(); // Start or resume the session at the beginning of the script

// Check if the user is logged in, using the session variable
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    $fullName = $_SESSION["full_name"]; // Retrieve the full name from the session
} else {
    $fullName = 'Guest'; // Default name if not logged in
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrix Quest</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
    <script defer src="javascript/game.js"></script>
</head>

<body>
    <div class="container">
    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) : ?>
            <div class="profile-section">
                <img src="images/profile.png" alt="Profile Picture" class="profile-pic">
                <p class="profile-name"><?php echo htmlspecialchars($fullName); ?></p>
                <a href="signin.php" class="signout-btn">Sign Out</a>
            </div>
        <?php endif; ?>
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <div class="game-area">
            <canvas id="tetris" width="480" height="800"></canvas>
            <div class="sidebar">
                <div class="game_heading">Score</div>
                <div class="game_content" id="score">0</div>
                <div class="game_heading">Level</div>
                <div class="game_content" id="level">1</div>
                <div class="game_heading">Next</div>
                <canvas  class="game_content" id="nextPiece" width="80" height="80"></canvas>
                <div class="game_heading">Special</div>
                <div class="game_content" id="special">Extra Features... <!-- For extra features --></div>
                <button id="playPauseButton">Pause</button>

            </div>
        </div>
    </div>
</body>

</html>