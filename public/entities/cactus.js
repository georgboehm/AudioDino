import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants.js";
import Entity from "./entity.js";

export const CACTUS_DEFAULT_X = CANVAS_WIDTH - 20;
export const CACTUS_DEFAULT_Y = CANVAS_HEIGHT - 30;
export const CACTUS_SPRITE_WIDTH = 480;
export const CACTUS_SPRITE_HEIGHT = 611;
export const CACTUS_RENDER_WIDTH = 20;
export const CACTUS_RENDER_HEIGHT = 30;

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

  update() {
    // move horizontally
    if (this.x <= 0) {
      this.x = CANVAS_WIDTH - 20;
    }
    this.x = this.x - 10;
  }

  reset() {
    this.x = CACTUS_DEFAULT_X;
    this.y = CACTUS_DEFAULT_Y;
  }
}

export default Cactus;
