import {
  drawStartScreen,
  clearCanvas,
  drawGameOverScreen,
} from "./drawUtils.js";
export const gameStates = {
  START: 0,
  PLAYING: 1,
  GAME_OVER: 2,
};

class Game {
  constructor(gameState, context, dino, cactus) {
    this.gameState = gameState;
    this.context = context;
    this.dino = dino;
    this.cactus = cactus;
    this.entities = [dino, cactus];
  }

  // Draw canvas and entities and update states
  update() {
    switch (this.gameState) {
      case gameStates.PLAYING:
        clearCanvas(this.context);
        this.entities.forEach((entity) => entity.draw(this.context));
        this.entities.forEach((entity) => entity.update());
        break;
      case gameStates.GAME_OVER:
        drawGameOverScreen(this.context);
        this.entities.forEach((entity) => entity.reset());
        break;
      default:
        drawStartScreen(this.context);
        this.entities.forEach((entity) => entity.draw(this.context));
        break;
    }
  }

  handleInput() {
    // Key was pressed to make dino jump
    if (this.gameState == gameStates.PLAYING && !this.dino.isJumping) {
      this.dino.isJumping = true;
      setTimeout(() => {
        this.dino.isJumping = false;
      }, 1000);
    }
    // Key was pressed to start new game
    if (
      this.gameState == gameStates.START ||
      this.gameState == gameStates.GAME_OVER
    ) {
      this.setGameState(gameStates.PLAYING);
      setTimeout(() => {
        this.dino.isJumping = false;
      }, 100);
    }
  }

  setGameState(state) {
    this.gameState = state;
  }
}

export default Game;
