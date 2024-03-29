document.addEventListener("DOMContentLoaded", () => {
  // Get the canvas element and its drawing context.
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");

  let isPaused = false; // Game starts in playing state, so 'paused' is false

  // Scale the canvas so each unit is 40x40 pixels.
  context.scale(40, 40);

  //Scans for arena for the completed lines and removes them
  function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
      for (let x = 0; x < arena[y].length; ++x) {
        if (arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
    }
    checkLevelUp();
  }

  function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Creates a matrix to represent the Tetris game board.
  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }
  // Create the different tetromino shapes
  function createPiece(type) {
    if (type === "T") {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
    } else if (type === "O") {
      return [
        [2, 2],
        [2, 2],
      ];
    } else if (type === "L") {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
    } else if (type === "J") {
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
    } else if (type === "I") {
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
    } else if (type === "S") {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === "Z") {
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  // Draws the game state including the grid and the tetrominoes
  function draw() {
    context.fillStyle = "#000"; // Clear the canvas with black
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 }); // Draw the static blocks on the arena
    drawMatrix(player.matrix, player.pos);
  }

  // Function to draw the matrix and add borders to each block
  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value]; // Fill color for blocks
          context.fillRect(x + offset.x, y + offset.y, 1, 1);

          // Add a white border around the block
          context.strokeStyle = ""; // Set a transparent background
          context.lineWidth = 0.05; // Set the border width
          context.strokeRect(x + offset.x, y + offset.y, 1, 1); // Draw the border
        }
      });
    });
  }

  // Merge the player's tetromino into the arena
  function merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
      updateScore();
    }
    dropCounter = 0;
  }

  // Check for the wall
  function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
      player.pos.x -= dir; // Undo the move if there's a collision
    }
  }

  // Resets the player's position and spawns a new tetromino
  function playerReset() {
    const pieces = "ILJOTSZ";
    if (!player.nextMatrix) {
      player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
      player.nextMatrix = createPiece(
        pieces[(pieces.length * Math.random()) | 0]
      );
    } else {
      player.matrix = player.nextMatrix;
      player.nextMatrix = createPiece(
        pieces[(pieces.length * Math.random()) | 0]
      );
    }

    player.pos.y = 0;
    player.pos.x =
      ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);

    if (collide(arena, player)) {
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore();
    }

    drawNextPiece(player.nextMatrix); // Update the next piece display
  }

  // Rotate the player's tetromino
  function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
        return;
      }
    }
  }

  //Rotate the block
  function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach((row) => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  let dropCounter = 0;
  let dropInterval = 500;
  let lastTime = 0;
  let scoreNextLevel = 100; // Score needed to reach the next level

  function update(time = 0) {
    if (!isPaused) {
      const deltaTime = time - lastTime;
      lastTime = time;

      dropCounter += deltaTime;
      if (dropCounter > dropInterval - (player.level * 100 - 100)) {
        // Speeds up based on level
        playerDrop();
        dropCounter = 0;
      }
    }

    draw();
    requestAnimationFrame(update);
  }

  function togglePlayPause() {
    isPaused = !isPaused; // Toggle the pause state

    // Update UI to reflect the current state
    document.getElementById("playPauseButton").innerText = isPaused
      ? "Play"
      : "Pause";
    document.getElementById("pauseControl").innerText = isPaused ? ">" : "||";
  }

  // Help from Chatgpt to use js to update score.....

  function updateScore() {
    document.getElementById("score").innerText = player.score;
    document.getElementById("level").innerText = player.level;

    // AJAX call to send the score to the server
    var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open("POST", "submitScore.php", true); // Configure it: POST-request for the URL /submitScore.php
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Set the request header

    xhr.onload = function () {
      // Define what happens on successful data submission
      if (this.status == 200) {
        console.log("Score submitted successfully");
      }
    };

    // Prepare the data to be sent in the request
    var data = "score=" + player.score;

    xhr.send(data); // Send the request with the score data
  }

  function checkLevelUp() {
    if (player.score >= scoreNextLevel) {
      player.level++;
      scoreNextLevel += 100; // Increase the threshold for the next level
      dropInterval -= 50; // Increase the speed of the game
      updateScore(); // Update the score and level display
    }
  }

  // Keyboard controls for moving and rotating the tetromino
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      playerMove(-1);
    } else if (event.key === "ArrowRight") {
      playerMove(1);
    } else if (event.key === "ArrowDown") {
      playerDrop();
    } else if (event.key === "ArrowUp") {
      // Rotate counterclockwise
      playerRotate(-1);
    } else if (event.key === "p" || event.key === "P") {
      togglePlayPause();
    }
  });

  // Function to simulate key presses
  function simulateKeyPress(keyValue) {
    var event = new KeyboardEvent("keydown", {
      key: keyValue,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  }

  // Event listeners for on-screen controls

  document
    .getElementById("pauseControl")
    .addEventListener("click", function () {
      togglePlayPause();

      this.innerText = isPaused ? ">" : "||";
    });
  document.getElementById("leftControl").addEventListener("click", function () {
    simulateKeyPress("ArrowLeft");
  });

  document
    .getElementById("rightControl")
    .addEventListener("click", function () {
      simulateKeyPress("ArrowRight");
    });

  document.getElementById("downControl").addEventListener("click", function () {
    simulateKeyPress("ArrowDown");
  });

  document
    .getElementById("rotateControl")
    .addEventListener("click", function () {
      simulateKeyPress("ArrowUp");
    });

  // Prevent default behavior for mousedown on button elements to avoid focus change
  document.querySelectorAll(".control-btn").forEach((button) => {
    button.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  });

  // This is because the canvas was showing pixelated blocks(help from chatgpt)

  function adjustCanvasForHighDPI(canvas) {
    const dpi = window.devicePixelRatio || 1;
    const styleHeight = +getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);
    const styleWidth = +getComputedStyle(canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    canvas.setAttribute("height", styleHeight * dpi);
    canvas.setAttribute("width", styleWidth * dpi);

    const ctx = canvas.getContext("2d");
    ctx.scale(dpi, dpi);
    return ctx;
  }

  // Function to see what next is coming
  function drawNextPiece(matrix) {
    const nextPieceCanvas = document.getElementById("nextPiece");
    const context = adjustCanvasForHighDPI(nextPieceCanvas); // Adjust for high DPI
    const blockSize = 30; // Set the size of each block

    const matrixWidth = matrix[0].length * blockSize;
    const matrixHeight = matrix.length * blockSize;
    const canvasWidth = nextPieceCanvas.width / window.devicePixelRatio; // Adjust for the scaling due to DPI
    const canvasHeight = nextPieceCanvas.height / window.devicePixelRatio;

    // Calculate starting positions to center the matrix
    const startX = (canvasWidth - matrixWidth) / 2;
    const startY = (canvasHeight - matrixHeight) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas for the next piece

    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(
            startX + x * blockSize,
            startY + y * blockSize,
            blockSize,
            blockSize
          ); // Draw each block of the piece centered
          context.strokeStyle = ""; // Set the border color
          context.lineWidth = 0.5; // Adjust the border width
          context.strokeRect(
            startX + x * blockSize,
            startY + y * blockSize,
            blockSize,
            blockSize
          );
        }
      });
    });
  }

  // Function for restart button
  function gameRestart() {
    arena.forEach((row) => row.fill(0)); // Clear the entire arena
    player.score = 0; // Reset score
    playerReset(); // Get a new tetromino and reset player's position
    updateScore(); // Update the score display
    if (isPaused) togglePlayPause(); // Ensure the game is not paused
  }
  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      gameRestart();
    });
  document.getElementById("homeButton").addEventListener("click", function () {
    window.location.href = "index.php";
  });

  document
    .getElementById("playPauseButton")
    .addEventListener("click", function () {
      togglePlayPause();
      // Update button text based on the game state
      this.innerText = isPaused ? "Play" : "Pause";
    });

  const colors = [
    null,
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF",
  ];

  const arena = createMatrix(12, 20);

  const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
    level: 1,
  };

  playerReset();
  updateScore();
  update();
});
