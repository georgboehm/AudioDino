import { spritePositionToImagePosition } from "../helpers.js";
import {
  CANVAS_HEIGHT,
  FRAMES_PER_SECOND,
  GROUND_HEIGHT,
} from "../constants.js";
import Entity from "./entity.js";
import {
  DinoFalling,
  DinoJumping,
  DinoRunning,
  dinoStates,
} from "../states/dinoStates.js";

export const DINO_RENDER_DIM = 72;
export const DINO_SPRITE_DIM = 24;
export const RUNNING_HEIGHT = CANVAS_HEIGHT - DINO_RENDER_DIM + 10;
export const MAX_JUMPING_HEIGHT =
  CANVAS_HEIGHT - DINO_RENDER_DIM - GROUND_HEIGHT - 100 + 30;
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
    this.states = [
      new DinoRunning(this),
      new DinoJumping(this),
      new DinoFalling(this),
    ];
    this.state = this.states[0];
    this.velocity = 0;
    this.gravity = -3;
    this.fps = FRAMES_PER_SECOND;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.state.enter();
  }
  setState(newState) {
    this.state = this.states[dinoStates[newState]];
    this.state.enter();
  }

  closeToGround() {
    return this.y > RUNNING_HEIGHT - 150;
  }

  reset() {
    this.y = RUNNING_HEIGHT - GROUND_HEIGHT;
    this.velocity = 0;
  }
}

export default Dino;
