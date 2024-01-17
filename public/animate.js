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
import Game from "./game.js";
import { GROUND_HEIGHT } from "./constants.js";

window.addEventListener("load", function () {
  // Initialize the canvas element and its context
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // Initialize entities
  const dino = new Dino(
    0,
    RUNNING_HEIGHT - GROUND_HEIGHT,
    DINO_SPRITE_DIM,
    DINO_SPRITE_DIM,
    DINO_RENDER_DIM,
    DINO_RENDER_DIM
  );

  const cactus = new Cactus(
    CACTUS_DEFAULT_X,
    CACTUS_DEFAULT_Y - GROUND_HEIGHT,
    CACTUS_SPRITE_WIDTH,
    CACTUS_SPRITE_HEIGHT,
    CACTUS_RENDER_WIDTH,
    CACTUS_RENDER_HEIGHT
  );

  // Initialize game
  const game = new Game(ctx, dino, cactus, 0);

  let lastTime = 0;
  // Animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (ctx) {
      game.state.draw();
      game.state.update(deltaTime);

      // Check for collision between entities
      if (collisionCheck(dino, cactus)) {
        game.setGameState("GAME_OVER");
      }

      // Cactus has reached left end of screen,
      // meaning the dino has jumped over it successfully
      if (cactus.despawn()) {
        game.increaseScore();
      }
      requestAnimationFrame(animate);
    }
  }
  animate(0);
});
