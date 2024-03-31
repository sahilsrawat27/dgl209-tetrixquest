<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrix Quest - Forgot Password</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <form action="forget_password.php" method="post">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>

            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required>

            <button type="submit" name="verify" class="log-btn">Verify</button>
        </form>
    </div>
    <?php
    if (isset($_POST['verify'])) {
        $servername = "localhost";
        $username = "root";
        $password = ""; 
        $dbname = "tetrix_quest"; 

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $dob = mysqli_real_escape_string($conn, $_POST['dob']);

        // Prepare SQL statement
        $stmt = $conn->prepare("SELECT * FROM users WHERE Email = ? AND DOB = ?");
        $stmt->bind_param("ss", $email, $dob);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            session_start();
            $_SESSION['reset_email'] = $email; // Store email in session to use in the reset password page
            header("Location: reset_password.php"); // Redirect to the reset password page
        } else {
            echo "<p class='error'>No account found with that email and date of birth.</p>";
        }

        $stmt->close();
        $conn->close();
    }
    ?>
</body>

</html>