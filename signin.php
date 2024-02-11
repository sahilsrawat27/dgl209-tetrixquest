<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrix Quest - SignIn</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <!-- Sign-in form -->
        <div class="log-section">
            <form action="" method="POST">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
                <button type="submit" class="log-btn">Sign In</button>
                <p class="log-text">Don't have an account? <a href="signup.php" class="log-link">Sign Up</a></p>
            </form>
        </div>
    </div>

    <?php
    // Process the sign-in form submission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Database credentials
        $servername = "localhost";
        $username = "root"; // Update with your DB username
        $password = ""; // Update with your DB password
        $dbname = "tetrix_quest"; // Update with your DB name

        // Create database connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: Please try again later."); // Use a user-friendly error message
        }

        // Sanitize user inputs
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        $password = $_POST["password"]; // Password will be hashed; sanitization specific to context

        // SQL query using prepared statement to include full name and DOB
        $stmt = $conn->prepare("SELECT id, password, full_name, dob FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row["password"])) {
                // Password is correct, start a session
                session_start();
                session_regenerate_id(true); // Prevent session fixation attacks
                $_SESSION["loggedin"] = true;
                $_SESSION["id"] = $row["id"];
                $_SESSION["email"] = $email;
                $_SESSION["full_name"] = $row["full_name"]; // Store full name in session
                $_SESSION["dob"] = $row["dob"]; // Store date of birth in session

                // Redirect user to the game home page
                header("Location: index.php");
                exit;
            } else {
                // Handle incorrect password
                echo "<p class='error'>Invalid password provided.</p>";
            }
        } else {
            // Handle user not found
            echo "<p class='error'>No account found with that email address.</p>";
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
    ?>

</body>

</html>