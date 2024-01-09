import { collisionCheck } from "./helpers.js";
import Dino, {
  DINO_RENDER_DIM,
  DINO_SPRITE_DIM,
  RUNNING_HEIGHT,
} from "./entities/dino.js";
import Cactus, {
  CACTUS_DEFAULT_X,
  CACTUS_DEFAULT_Y,
  CACTUS_RENDER_HEIGHT,
  CACTUS_RENDER_WIDTH,
  CACTUS_SPRITE_HEIGHT,
  CACTUS_SPRITE_WIDTH,
} from "./entities/cactus.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

let gameState = "start"; // Possible values: 'start', 'playing', 'gameOver'

// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// Initialize entities
const dino = new Dino(
  0,
  RUNNING_HEIGHT,
  DINO_SPRITE_DIM,
  DINO_SPRITE_DIM,
  DINO_RENDER_DIM,
  DINO_RENDER_DIM
);

const cactus = new Cactus(
  CACTUS_DEFAULT_X,
  CACTUS_DEFAULT_Y,
  CACTUS_SPRITE_WIDTH,
  CACTUS_SPRITE_HEIGHT,
  CACTUS_RENDER_WIDTH,
  CACTUS_RENDER_HEIGHT
);

let entities = [dino, cactus];

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
    entities.forEach((entity) => entity.draw(ctx));

    // Update entities
    if (gameState == "playing") {
      entities.forEach((entity) => entity.update());
    }

    if (collisionCheck(dino, cactus)) {
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
    entities.forEach((entity) => entity.reset());
    gameState = "start";
    setTimeout(function () {
      dino.isJumping = false;
    });
  }
  if (gameState == "start") {
    gameState = "playing";
    setTimeout(function () {
      dino.isJumping = false;
    });
  }
  dino.isJumping = true;
  setTimeout(function () {
    dino.isJumping = false;
  }, 1000);
});
