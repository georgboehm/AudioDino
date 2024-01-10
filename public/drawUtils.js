import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { AUDIO_UNLOCK_SCORE } from "./constants.js";
import { toggleAudioDownloadLinkVisibility } from "./helpers.js";

export function drawStartScreen(context) {
  context.font = "24px Arial";
  context.fillText(
    "Press any button to start!",
    CANVAS_WIDTH / 2 - 130,
    CANVAS_HEIGHT / 2 - 100
  );
}

export function drawPlayingScreen(context, score) {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText(`Score: ${score}`, 25, 30);
}

export function drawGameOverScreen(context, score) {
  let displayText;
  let displayTextX;
  if (score >= AUDIO_UNLOCK_SCORE) {
    toggleAudioDownloadLinkVisibility(true);
    displayText = "Track unlocked!";
    displayTextX = CANVAS_WIDTH / 2 - 165;
  } else {
    displayText = "Game Over";
    displayTextX = CANVAS_WIDTH / 2 - 125;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "white";
  context.font = "48px Arial";
  context.fillText(displayText, displayTextX, CANVAS_HEIGHT / 2 - 50);
  context.font = "24px Arial";
  context.fillText(
    `Final score: ${score}`,
    CANVAS_WIDTH / 2 - 75,
    CANVAS_HEIGHT / 2
  );
  context.font = "24px Arial";
  context.fillText(
    "Press any button to try again!",
    CANVAS_WIDTH / 2 - 160,
    CANVAS_HEIGHT / 2 + 50
  );
}
