import { collisionCheck } from "./helpers.js";
import { Dino } from "./entities/dino.js";
import { Cactus } from "./entities/cactus.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

let gameState = "start"; // Possible values: 'start', 'playing', 'gameOver'

// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// Animation loop
function animate() {
  if (ctx) {
    if (gameState == "start") {
      ctx.font = "24px Arial";
      ctx.fillText(
        "Press any button to start!",
        CANVAS_WIDTH / 2 - 130,
        CANVAS_HEIGHT / 2 - 100
      );
    }
    if (gameState == "gameOver") {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.fillText("Game Over", CANVAS_WIDTH / 2 - 125, CANVAS_HEIGHT / 2);
      ctx.font = "24px Arial";
      ctx.fillText(
        "Press any button to try again!",
        CANVAS_WIDTH / 2 - 160,
        CANVAS_HEIGHT / 2 + 50
      );
      return; // Stop rendering
    }

    // clear canvas on every frame when playing
    if (gameState == "playing") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw entities
    Dino.draw(ctx);
    Cactus.draw(ctx);

    // Update entities
    if (gameState == "playing") {
      Dino.update();
      Cactus.update();
    }

    if (collisionCheck(Dino, Cactus)) {
      gameState = "gameOver";
    }
  }
}

// Main loop
window.onload = function () {
  setInterval(animate, 100);
};

// Dino jump event listener
document.addEventListener("keydown", () => {
  if (gameState == "gameOver") {
    Dino.reset();
    Cactus.reset();
    gameState = "start";
    setTimeout(function () {
      Dino.isJumping = false;
    });
  }
  if (gameState == "start") {
    gameState = "playing";
    setTimeout(function () {
      Dino.isJumping = false;
    });
  }
  Dino.isJumping = true;
  setTimeout(function () {
    Dino.isJumping = false;
  }, 1000);
});
