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
    <title>Tetrix Quest - Home</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
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
        <div class="menu-container">
            <button class="tetris-btn">Start Game</button>
            <button class="tetris-btn">Tournaments</button>
            <button class="tetris-btn">High Scores</button>
            <button class="tetris-btn">Instructions</button>
            <button class="tetris-btn">Exit Game</button>
        </div>
    </div>

</body>

</html>