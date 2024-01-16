import { spritePositionToImagePosition } from "../helpers.js";
import { CANVAS_HEIGHT } from "../constants.js";
import Entity from "./entity.js";

export const DINO_RENDER_DIM = 72;
export const DINO_SPRITE_DIM = 24;
export const RUNNING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10;
const MAX_JUMPING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM - 100 + 30;
const DINO_SPRITE_WALK_CYCLE = [3, 4, 5, 6, 7, 8].map(
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
    this.isFalling = false;
    this.frameIndex = 0;
    this.velocity = 0;
    this.gravity = -20;
  }

  update(frame) {
    // update sprite every 5 frames
    if (frame % 5 === 0) {
      // find next sprite
      if (this.frameIndex === DINO_SPRITE_WALK_CYCLE.length) {
        this.frameIndex = 0;
      }
      this.sprite = DINO_SPRITE_WALK_CYCLE[this.frameIndex];

      // manage jumping state
      if (this.isJumping) {
        // reached max jump height
        if (this.y < MAX_JUMPING_HEIGHT) {
          this.isJumping = false;
          this.isFalling = true;
        } else {
          // keep accelerating
          this.velocity += this.gravity;
        }
      }
      if (this.isFalling) {
        // dino needs to fall down again
        if (this.velocity <= 20) {
          this.velocity += -this.gravity;
        }
      }

      // close to ground again, start running state
      if (this.y > RUNNING_HEIGHT - 50 && this.isFalling) {
        this.run();
      }
      this.y = this.y + this.velocity;
      this.frameIndex++;
    }
  }

  jump() {
    this.isJumping = true;
    this.velocity = this.gravity;
  }

  run() {
    this.y = RUNNING_HEIGHT;
    this.isJumping = false;
    this.isFalling = false;
    this.velocity = 0;
  }

  reset() {
    this.y = RUNNING_HEIGHT;
    this.isJumping = false;
    this.isFalling = false;
    this.velocity = 0;
  }
}

export default Dino;
