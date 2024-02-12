document.addEventListener("DOMContentLoaded", () => {
  // Get the canvas element and its drawing context.
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");

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
    player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    player.pos.y = 0;
    player.pos.x =
      ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    if (collide(arena, player)) {
      // Game over reset
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore();
    }
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
  let dropInterval = 1000;

  let lastTime = 0;
  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
    }

    draw();
    requestAnimationFrame(update);
  }

  function updateScore() {
    document.getElementById("score").innerText = player.score;
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
    }
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
  };

  playerReset();
  updateScore();
  update();
});
