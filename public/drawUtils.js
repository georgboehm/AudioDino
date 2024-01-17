import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { AUDIO_UNLOCK_SCORE } from "./constants.js";
import { toggleAudioDownloadLinkVisibility } from "./helpers.js";

const backgroundImage = new Image();
backgroundImage.src = "./sprites/background.png";

export function drawBackground(context) {
  context.drawImage(
    backgroundImage,
    0,
    0,
    3072,
    1536,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
}

export function drawEntities(context, entities) {
  entities.forEach((entity) => entity.draw(context));
}

export function drawStartScreen(context, entities) {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground(context);
  context.font = "24px Arial";
  context.fillText(
    "Press any button to start!",
    CANVAS_WIDTH / 2 - 130,
    CANVAS_HEIGHT / 2 - 100
  );
  drawEntities(context, entities);
}

export function drawPlayingScreen(context, entities, score) {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground(context);
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText(`Score: ${score}`, 25, 30);
  drawEntities(context, entities);
}

export function drawGameOverScreen(context, entities, score) {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground(context);
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
  drawEntities(context, entities);
}
