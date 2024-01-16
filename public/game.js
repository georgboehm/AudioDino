import {
  drawStartScreen,
  drawPlayingScreen,
  drawGameOverScreen,
} from "./drawUtils.js";
import { toggleAudioDownloadLinkVisibility } from "./helpers.js";

export const gameStates = {
  START: 0,
  PLAYING: 1,
  GAME_OVER: 2,
};

class Game {
  constructor(gameState, context, dino, cactus, score) {
    this.gameState = gameState;
    this.context = context;
    this.dino = dino;
    this.cactus = cactus;
    this.entities = [dino, cactus];
    this.score = score;
    this.frame = 0;
  }

  // Draw canvas and entities and update states
  update() {
    this.nextFrame();
    switch (this.gameState) {
      case gameStates.PLAYING:
        drawPlayingScreen(this.context, this.entities, this.score);
        this.entities.forEach((entity) => entity.update(this.frame));
        break;
      case gameStates.GAME_OVER:
        drawGameOverScreen(this.context, this.score);
        // Check for download link highscore
        this.entities.forEach((entity) => entity.reset());
        // Stop audio from playing
        const audioFile = document.querySelector("#audioPlayer audio");
        audioFile.pause();
        break;
      default:
        drawStartScreen(this.context, this.entities, this.score);
        break;
    }
  }

  handleInput() {
    // Key was pressed to make dino jump
    if (this.gameState == gameStates.PLAYING && !this.dino.isJumping) {
      this.dino.jump();
    }
    // Key was pressed to start new game
    if (
      this.gameState == gameStates.START ||
      this.gameState == gameStates.GAME_OVER
    ) {
      // Start audio file
      const audioFile = document.querySelector("#audioPlayer audio");
      audioFile.currentTime = 0;
      // audioFile.play(); // TODO
      this.setGameState(gameStates.PLAYING);
      this.reset();
    }
  }

  nextFrame() {
    if (this.frame >= 5) {
      this.frame = 0;
    } else {
      this.frame++;
    }
  }

  increaseScore() {
    this.score = this.score + 1;
  }

  setGameState(state) {
    this.gameState = state;
  }

  reset() {
    this.score = 0;
    toggleAudioDownloadLinkVisibility(false);
  }
}

export default Game;
