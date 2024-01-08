// V1 TODOs
// Lastly alles pushen, README mit kleinem screenshot, in portfolio adden und portfolio project noch private machen

import { DINO_SPRITE_WALK_CYCLE } from "./entities/dino.js ";

import { collisionCheck } from "./helpers.js";
import { Dino } from "./entities/dino.js";
import { Cactus } from "./entities/cactus.js";

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
    // find next sprite
    if (frameIndex === DINO_SPRITE_WALK_CYCLE.length) {
      frameIndex = 0;
    }
    frame = DINO_SPRITE_WALK_CYCLE[frameIndex];

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    frameIndex += 1;
    Dino.update();
    Cactus.update();

    if (collisionCheck(Dino, Cactus)) {
      alert("Game over!");
    }
  }
}

// Main loop
dinoImage.onload = function () {
  setInterval(animate, 100);
};

// Dino jump event listener
document.addEventListener("keydown", () => {
  Dino.isJumping = true;
  setTimeout(function () {
    Dino.isJumping = false;
  }, 1000);
});
