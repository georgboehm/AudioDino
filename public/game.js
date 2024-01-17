import { toggleAudioDownloadLinkVisibility } from "./helpers.js";
import {
  GameOver,
  GamePlaying,
  GameStart,
  gameStates,
} from "./states/gameStates.js";

class Game {
  constructor(context, dino, cactus, score) {
    this.states = [
      new GameStart(this),
      new GamePlaying(this),
      new GameOver(this),
    ];
    this.state = this.states[0];
    this.context = context;
    this.dino = dino;
    this.cactus = cactus;
    this.entities = [dino, cactus];
    this.score = score;
    this.frame = 0;
    this.state.enter();

    // Game state event listener
    document.addEventListener("keydown", () => {
      this.state.handleInput();
    });
  }

  increaseScore() {
    this.score = this.score + 1;
  }

  setGameState(state) {
    this.state = this.states[gameStates[state]];
    this.state.enter();
  }

  reset() {
    this.score = 0;
    toggleAudioDownloadLinkVisibility(false);
  }
}

export default Game;
