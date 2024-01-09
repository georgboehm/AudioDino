import { spritePositionToImagePosition } from "../helpers.js";
import { CANVAS_HEIGHT } from "../constants.js";

export const DINO_RENDER_DIM = 72;
export const DINO_SPRITE_DIM = 24;

const RUNNING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10;
const JUMPING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10 - 100;

export const DINO_SPRITE_WALK_CYCLE = [3, 4, 5, 6, 7, 8].map(
  spritePositionToImagePosition
);

export const Dino = {
  x: 0,
  y: RUNNING_HEIGHT,
  spriteWidth: DINO_SPRITE_DIM,
  spriteHeight: DINO_SPRITE_DIM,
  renderWidth: DINO_RENDER_DIM,
  renderHeight: DINO_RENDER_DIM,
  isJumping: false,
  // ... any other properties ...

  update() {
    if (this.isJumping) {
      this.y = JUMPING_HEIGHT;
    } else {
      this.y = RUNNING_HEIGHT;
    }
  },

  draw(ctx) {
    // Draw Dino on the canvas
    // ...
  },

  reset() {
    this.y = RUNNING_HEIGHT;
    this.isJumping = false;
  },
};
