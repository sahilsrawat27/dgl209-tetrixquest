document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");

  // Scale the canvas so each block drawn is effectively 20x20 pixels.
  context.scale(40, 40);

  // Creates a matrix to represent the Tetris game board.

  // Width (w) and height (h) parameters define the size of the grid.
  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      // Push a new row filled with 0s (empty cells) into the matrix.
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  // Draws a matrix on the canvas at the specified offset.
  // This function is used for drawing both the game board and the tetrominos.
  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          // Set the fill color for blocks (non-zero values in the matrix).
          context.fillStyle = "red";
          // Draw a filled rectangle for each block.
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
          // Set the stroke color for the block's border.
          context.strokeStyle = "white";
          // Draw a border around the block.
          context.strokeRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  // Draws a grid on the canvas to visually separate the cells.
  function drawGrid() {
    context.strokeStyle = "grey"; // Set the color for the grid lines.
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 12; x++) {
        // Draw a rectangle for each cell in the grid.
        context.strokeRect(x, y, 1, 1);
      }
    }
  }

  // The main draw function that clears the canvas and redraws the game state.
  function draw() {
    // Clear the entire canvas.
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the game elements.
    drawGrid(); // Draw the background grid.
    drawMatrix(arena, { x: 0, y: 0 }); // Draw the static blocks on the arena.
  }
  //Create the blocks
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

  // Initialize the arena matrix with a call to createMatrix.
  const arena = createMatrix(12, 20);

  // Perform the initial draw call to display the setup on the canvas.
  draw();
});
