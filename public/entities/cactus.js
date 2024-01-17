import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_HEIGHT,
  FRAMES_PER_SECOND,
} from "../constants.js";
import { CactusDefault } from "../states/cactusStates.js";
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
    this.states = [new CactusDefault(this)];
    this.state = this.states[0];
    this.fps = FRAMES_PER_SECOND;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
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
