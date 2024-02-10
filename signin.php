<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrix Quest - Login</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Tetrix Quest</h1>
        <p class="quote">Embark on a puzzle adventure.</p>
        <div class="flex-container">
            <!-- Sign-in form -->
            <div class="login-section">
                <form action="" method="POST">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required><br><br>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required><br><br>
                    <button type="submit" class="signin-btn">Sign In</button>
                    <p class="login-text">Don't have an account? <a href="signup.php" class="login-link">Sign up</a></p>
                </form>
            </div>
            <!-- Tetris game animation -->
            <div class="tetris-animation">
                <p>Tetris game animation placeholder</p>
            </div>
        </div>
    </div>
</body>
</html>
