import { DINO_SPRITE_DIM, DINO_RENDER_DIM } from "./entities/dino.js";

// Converts column for dino sprites into coordinates
function spritePositionToImagePosition(col) {
  return {
    x: col * DINO_SPRITE_DIM,
    y: 0, // only one row of sprites in sheet
  };
}

// Checks for collision between dino and cactus
function collisionCheck(dino, cactus) {
  return (
    dino.x + DINO_RENDER_DIM - 20 > cactus.x &&
    dino.y + DINO_RENDER_DIM > cactus.y
  );
}

// Function to toggle linkDiv visibility
function toggleAudioDownloadLinkVisibility(showLink) {
  const linkDiv = document.getElementById("linkDiv");
  linkDiv.style.display = showLink ? "block" : "none";
}

export {
  spritePositionToImagePosition,
  collisionCheck,
  toggleAudioDownloadLinkVisibility,
};
