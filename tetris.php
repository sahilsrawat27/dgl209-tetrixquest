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
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <div class="game-area">
            <canvas id="tetris" width="480" height="800"></canvas>
            <div class="sidebar">
                <div id="score">Score: 0</div>
                <div id="level">Level: 1</div>
                <div id="next">Next:</div>
                <canvas id="nextPiece" width="100" height="100"></canvas>
                <div id="special">Special:  <!-- For extra features --></div>
               
            </div>
        </div>
    </div>
</body>

</html>