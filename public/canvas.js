import { DINO_SPRITE_WALK_CYCLE } from "./entities/dino.js ";

import { collisionCheck } from "./helpers.js";
import { Dino } from "./entities/dino.js";
import { Cactus } from "./entities/cactus.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

let gameState = "start"; // Possible values: 'start', 'playing', 'gameOver'

// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// Load spritesheets
const dinoImage = new Image();
dinoImage.src = "../sprites/dinoSprites.png";
const cactusImage = new Image();
cactusImage.src = "../sprites/cactus.png";

// Animation loop
let frameIndex = 0;
let frame;

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
    if (frameIndex === DINO_SPRITE_WALK_CYCLE.length) {
      // find next sprite
      frameIndex = 0;
    }
    frame = DINO_SPRITE_WALK_CYCLE[frameIndex];

    // clear canvas on every frame when playing
    if (gameState == "playing") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // draw dino
    ctx.drawImage(
      dinoImage,
      frame.x,
      frame.y,
      Dino.spriteWidth,
      Dino.spriteHeight,
      Dino.x,
      Dino.y,
      Dino.renderWidth,
      Dino.renderHeight
    );

    // draw cactus
    ctx.drawImage(
      cactusImage,
      0, // only one sprite to consider
      0, // only one sprite to consider
      Cactus.spriteWidth,
      Cactus.spriteHeight,
      Cactus.x,
      Cactus.y,
      Cactus.renderWidth,
      Cactus.renderHeight
    );

    // Update entities and sprites
    if (gameState == "playing") {
      frameIndex += 1;
      Dino.update();
      Cactus.update();
    }

    if (collisionCheck(Dino, Cactus)) {
      gameState = "gameOver";
    }
  }
}

// Main loop
dinoImage.onload = function () {
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
