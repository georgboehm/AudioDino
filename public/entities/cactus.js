import { CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_HEIGHT } from "../constants.js";
import Entity from "./entity.js";

export const CACTUS_DEFAULT_X = CANVAS_WIDTH - 20;
export const CACTUS_DEFAULT_Y = CANVAS_HEIGHT - 30;
export const CACTUS_SPRITE_WIDTH = 480;
export const CACTUS_SPRITE_HEIGHT = 611;
export const CACTUS_RENDER_WIDTH = 20;
export const CACTUS_RENDER_HEIGHT = 30;
export const CACTUS_DESPAWN_X = 0;

const cactusImage = new Image();
cactusImage.src = "../sprites/cactus.png";

class Cactus extends Entity {
  constructor(x, y, spriteWidth, spriteHeight, renderWidth, renderHeight) {
    super(
      x,
      y,
      cactusImage,
      cactusImage,
      spriteWidth,
      spriteHeight,
      renderWidth,
      renderHeight
    );
  }

  update(frame) {
    if (frame % 5 === 0) {
      // move horizontally
      this.x = this.x - 15;
    }
  }

  reset() {
    this.x = CACTUS_DEFAULT_X;
    this.y = CACTUS_DEFAULT_Y - GROUND_HEIGHT;
  }

  despawn() {
    if (this.x <= CACTUS_DESPAWN_X) {
      this.x = CANVAS_WIDTH - 20;
      return true;
    }
    return false;
  }
}

export default Cactus;
