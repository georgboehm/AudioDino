import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants.js";

const CACTUS_DEFAULT_X = CANVAS_WIDTH - 20;
const CACTUS_DEFAULT_Y = CANVAS_HEIGHT - 30;
export const Cactus = {
  x: CANVAS_WIDTH - 20,
  y: CANVAS_HEIGHT - 30,
  spriteWidth: 480,
  spriteHeight: 611,
  renderWidth: 20,
  renderHeight: 30,

  update() {
    if (this.x <= 0) {
      this.x = CANVAS_WIDTH - 20;
    }
    this.x = this.x - 10;
  },

  draw(ctx) {
    // Draw Cactus on the canvas
    // ...
  },

  reset() {
    this.x = CACTUS_DEFAULT_X;
    this.y = CACTUS_DEFAULT_Y;
  },
};
