<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrix Quest - SignUp</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
</head>
<body>
    <!-- This page is copied from sigin.php and edited to ensure consistency between both the pages--> 
    <div class="container">
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Join the puzzle adventure.</p>
            <form action="" method="POST" class="log-section">
                <label for="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" required><br><br>

                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" name="dob" required><br><br>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required><br><br>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" required><br><br>

                <button type="submit" class="log-btn">Sign Up</button>
                <p class="log-text">Already have an account? <a href="signin.php" class="log-link">Sign In</a></p>
            </form>
    </div>

</body>

</html>