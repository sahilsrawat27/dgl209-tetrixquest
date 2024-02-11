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
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST" class="log-section">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" required>

            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <button type="submit" class="log-btn">Sign Up</button>
            <p class="log-text">Already have an account? <a href="signin.php" class="log-link">Sign In</a></p>
        </form>
    </div>

    <?php
    // Check if the form is submitted
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
            die("Connection failed: " . $conn->connect_error);
        }

        // Sanitize and validate user inputs
        $fullname = $conn->real_escape_string($_POST['fullname']);
        $dob = $conn->real_escape_string($_POST['dob']);
        $email = $conn->real_escape_string($_POST['email']);
        $password = $conn->real_escape_string($_POST['password']);

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare an INSERT statement to add user data into the database
        $stmt = $conn->prepare("INSERT INTO users (FullName, DOB, Email, Password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullname, $dob, $email, $hashed_password);

        // Execute the statement and check if the insert was successful
        if ($stmt->execute()) {
            echo "<p class='success'>Registration successful. <a href='signin.php'>Sign in</a></p>";
        } else {
            echo "<p class='error'>Error: " . $stmt->error . "</p>";
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
    ?>
</body>

</html>