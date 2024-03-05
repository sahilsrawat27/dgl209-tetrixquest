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
</head>

<body>
    <div class="container">
        <h1 class="game_title">Tetrix Quest</h1>
        <p class="game_quote">Embark on a puzzle adventure.</p>
        <div class="leaderboard" id="leaderboard">
            <h2>Leaderboard</h2>
            <!-- PHP-generated leaderboard will be initially displayed here but replaced by JavaScript -->
            <div id="leaderboard-content"> <!-- Add this wrapper for the initial PHP content -->
                <?php if (!empty($leaderboard)) : ?>
                    <table>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>High Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($leaderboard as $row) : ?>
                                <tr>
                                    <td><?= htmlspecialchars($row['FullName']) ?></td>
                                    <td><?= htmlspecialchars($row['Highscore']) ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else : ?>
                    <p>No scores to display.</p>
                <?php endif; ?>
            </div>
        </div>

    </div>
    <script>
        function updateLeaderboard() {
            fetch('fetch_leaderboard.php')
                .then(response => response.json())
                .then(data => {
                    const leaderboardContentElement = document.getElementById('leaderboard-content');
                    leaderboardContentElement.innerHTML = ''; // Clear current leaderboard entries

                    if (data.length > 0) {
                        const table = document.createElement('table');
                        const thead = document.createElement('thead');
                        const tbody = document.createElement('tbody');

                        // Heading Row
                        let row = thead.insertRow();
                        let th1 = row.insertCell(0);
                        let th2 = row.insertCell(1);
                        th1.innerHTML = "<b>Full Name</b>";
                        th2.innerHTML = "<b>High Score</b>";

                        table.appendChild(thead);

                        // Data Rows
                        data.forEach(entry => {
                            let row = tbody.insertRow();
                            let cell1 = row.insertCell(0);
                            let cell2 = row.insertCell(1);
                            cell1.innerText = entry.FullName;
                            cell2.innerText = entry.Highscore;
                        });

                        table.appendChild(tbody);
                        leaderboardContentElement.appendChild(table);
                    } else {
                        leaderboardContentElement.innerText = 'No scores to display.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching leaderboard:', error);
                });
        }
        updateLeaderboard(); // Populate leaderboard immediately on page load

    </script>
</body>

</html>