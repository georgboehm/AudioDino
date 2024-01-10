import { collisionCheck, jumpOverCactusSuccessful } from "./helpers.js";
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
import Game, { gameStates } from "./game.js";

// Initialize the canvas element and its context
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

const game = new Game(gameStates.START, ctx, dino, cactus, 0);

// Animation loop
function animate() {
  if (ctx) {
    game.update();

    // Check for collision between entities
    if (collisionCheck(dino, cactus)) {
      game.setGameState(gameStates.GAME_OVER);
    }

    // Check for score increase
    if (jumpOverCactusSuccessful(dino, cactus)) {
      game.increaseScore();
    }
  }
}

// Main loop - generate new frame every 100 milliseconds
window.onload = function () {
  setInterval(animate, 100);
};

// Dino jump event listener
document.addEventListener("keydown", () => {
  game.handleInput();
});
