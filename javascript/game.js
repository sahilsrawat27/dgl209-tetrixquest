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

  //Rotate the block

  function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; x++) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach((row) => row.reverse());
    } else {
      matrix.reverse();
    }
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
