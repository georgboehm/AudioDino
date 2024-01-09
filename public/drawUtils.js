import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

export function drawStartScreen(context) {
  context.font = "24px Arial";
  context.fillText(
    "Press any button to start!",
    CANVAS_WIDTH / 2 - 130,
    CANVAS_HEIGHT / 2 - 100
  );
}

export function clearCanvas(context) {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawGameOverScreen(context) {
  context.fillStyle = "black";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "white";
  context.font = "48px Arial";
  context.fillText("Game Over", CANVAS_WIDTH / 2 - 125, CANVAS_HEIGHT / 2);
  context.font = "24px Arial";
  context.fillText(
    "Press any button to try again!",
    CANVAS_WIDTH / 2 - 160,
    CANVAS_HEIGHT / 2 + 50
  );
}
