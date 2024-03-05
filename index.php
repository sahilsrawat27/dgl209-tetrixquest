<?php
session_start(); // Start or resume the session at the beginning of the script

// Check if the user is logged in, using the session variable
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    $fullName = $_SESSION["full_name"]; // Retrieve the full name from the session
    $score = $_SESSION["score"]; //Retrive the highscore from the session
} else {
    $fullName = 'Guest'; // Default name if not logged in
    $score = 'No score yet'; // Default score
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
            <a class="link_pad" href="tetris.php"> <button class="tetris-btn">Start Game</button></a>
            <a class="link_pad" href="tournaments.php"> <button class="tetris-btn">Tournaments</button></a>

            <button class="tetris-btn high-scores">High Scores</button>
            <!-- High Scores Modal -->
            <div id="highScoresModal" class="modal">
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) : ?>
                    <div class="modal-content">
                        <span class="close-button" onclick="closeModal('highScoresModal')">&times;</span>
                        <h2>High Scores</h2>
                        <p id="score"></p>
                    </div>
                <?php endif; ?>
            </div>
            <button class="tetris-btn instructions">Instructions</button>
            <!-- Instructions Modal -->
            <div id="instructionsModal" class="modal">
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal('instructionsModal')">&times;</span>
                    <h2>Instructions</h2>
                    <p>Press arrow right or arrow left to move the block sideways. To move the block downward, press arrow down button.
                        Press arrow up button to rotate the block. Press P to play/pause the game.
                    </p>
                </div>
            </div>

            <a class="link_pad" href="signin.php"><button class="tetris-btn">Exit Game</button></a>
        </div>
    </div>

    <script>
        // Function to open a modal
        function openModal(modalId) {
            document.getElementById(modalId).style.display = "block";
        }

        // Function to close a modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = "none";
        }

        document.querySelector('.tetris-btn.instructions').addEventListener('click', function() {
            openModal('instructionsModal');
        });

        document.querySelector('.tetris-btn.high-scores').addEventListener('click', function() {
            openModal('highScoresModal');
        });

        //From chatgpt to update score faster
        // Function to fetch and update the high score
        function fetchAndUpdateHighScore() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "fetch_highscore.php", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("score").innerText = xhr.responseText;
                }
            };
            xhr.send();
        }

        // Call the function at regular intervals
        setInterval(fetchAndUpdateHighScore, 1000); // Update every 10 seconds
    </script>
</body>

</html>