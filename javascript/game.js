document.addEventListener("DOMContentLoaded", () => {
  // Get the canvas element and its drawing context.
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");
  // Scale the canvas so each unit is 40x40 pixels.
  context.scale(40, 40);

  // Creates a matrix to represent the Tetris game board.
  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  // Function to draw the matrix and add borders to each block
  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = "red"; // Fill color for blocks
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
          context.strokeStyle = "white"; // Border color for blocks
          context.strokeRect(x + offset.x, y + offset.y, 1, 1); // Draw the border
        }
      });
    });
  }

  // Draws the grid on the canvas to visually separate the cells
  function drawGrid() {
    context.strokeStyle = "grey"; // Grid color
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        context.strokeRect(x, y, 1, 1);
      }
    }
  }

  // Draws the game state including the grid and the tetrominoes
  function draw() {
    context.fillStyle = "#000"; // Clear the canvas with black
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(); // Draw the background grid
    drawMatrix(arena, { x: 0, y: 0 }); // Draw the static blocks on the arena
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

  // Check if the player's current block overlaps with existing blocks
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

  // Check for the wall
  function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
      player.pos.x -= dir; // Undo the move if there's a collision
    }
  }

  //
  function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player); // Merge current tetromino with the arena
      playerReset(); // Spawn a new tetromino
    }
  }

  const arena = createMatrix(10, 20); // Initialize the arena with the size of 10x20

  draw(); // Initial drawing to the screen
});
