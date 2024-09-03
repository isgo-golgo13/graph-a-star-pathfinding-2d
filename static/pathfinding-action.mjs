const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 5; // Size of each cell in the maze

export function drawMaze(matrix) {
  console.log("Drawing maze with matrix:", matrix); // Debug log
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      ctx.fillStyle = matrix[row][col] === 0 ? "#e0e0e0" : "#333"; // Light gray for paths, dark gray for walls
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

export function animatePath(path) {
  console.log("Animating path:", path); // Debug log
  let index = 0;
  const delay = 50; // Delay in milliseconds between each step

  function step() {
    if (index < path.length) {
      const [row, col] = path[index];
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(
        col * cellSize + cellSize / 2,
        row * cellSize + cellSize / 2,
        cellSize / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      index++;
      setTimeout(step, delay); // Delay before the next step
    }
  }
  step();
}

export async function startPathfinding() {
  const response = await fetch("/path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start: [0, 0], goal: [99, 99] }),
  });
  const data = await response.json();
  if (response.ok) {
    drawMaze(data.matrix); // Draw the maze using the matrix from the server
    animatePath(data.path); // Animate the path
  } else {
    console.error("Path not found");
    alert("Path not found");
  }
}
