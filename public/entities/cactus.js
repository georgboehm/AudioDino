import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants.js";

const CACTUS_DEFAULT_X = CANVAS_WIDTH - 20;
const CACTUS_DEFAULT_Y = CANVAS_HEIGHT - 30;
const cactusImage = new Image();
cactusImage.src = "../sprites/cactus.png";

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

  draw(context) {
    // Draw Cactus on the canvas
    context.drawImage(
      cactusImage,
      0, // only one sprite to consider
      0, // only one sprite to consider
      Cactus.spriteWidth,
      Cactus.spriteHeight,
      Cactus.x,
      Cactus.y,
      Cactus.renderWidth,
      Cactus.renderHeight
    );
  },

  reset() {
    this.x = CACTUS_DEFAULT_X;
    this.y = CACTUS_DEFAULT_Y;
  },
};
