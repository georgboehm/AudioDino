import { spritePositionToImagePosition } from "../helpers.js";
import { CANVAS_HEIGHT } from "../constants.js";
import Entity from "./entity.js";

export const DINO_RENDER_DIM = 72;
export const DINO_SPRITE_DIM = 24;
export const RUNNING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10;
export const JUMPING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10 - 100;
export const DINO_SPRITE_WALK_CYCLE = [3, 4, 5, 6, 7, 8].map(
  spritePositionToImagePosition
);
const dinoSprites = new Image();
dinoSprites.src = "../sprites/dino.png";

class Dino extends Entity {
  constructor(x, y, spriteWidth, spriteHeight, renderWidth, renderHeight) {
    super(
      x,
      y,
      dinoSprites,
      DINO_SPRITE_WALK_CYCLE[0],
      spriteWidth,
      spriteHeight,
      renderWidth,
      renderHeight
    );
    this.isJumping = false;
    this.frameIndex = 0;
  }

  update() {
    // find next sprite
    if (this.frameIndex === DINO_SPRITE_WALK_CYCLE.length) {
      this.frameIndex = 0;
    }
    this.sprite = DINO_SPRITE_WALK_CYCLE[this.frameIndex];

    // manage jumping state
    if (this.isJumping) {
      this.y = JUMPING_HEIGHT;
    } else {
      this.y = RUNNING_HEIGHT;
    }
    this.frameIndex++;
  }

  reset() {
    this.y = RUNNING_HEIGHT;
    this.isJumping = false;
  }
}

export default Dino;
