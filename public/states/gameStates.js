import {
  drawStartScreen,
  drawPlayingScreen,
  drawGameOverScreen,
} from "../drawUtils.js";

export const gameStates = {
  START: 0,
  PLAYING: 1,
  GAME_OVER: 2,
};

class GameState {
  constructor(state) {
    this.state = state;
  }
}

export class GameStart extends GameState {
  constructor(game) {
    super("START");
    this.game = game;
  }
  draw() {
    // draw start screen
    drawStartScreen(this.game.context, this.game.entities, this.game.score);
  }
  enter() {
    // draw start screen
    this.draw();
  }
  update() {
    // nothing to update here
    return;
  }

  handleInput() {
    this.game.setGameState("PLAYING");
  }
}

export class GamePlaying extends GameState {
  constructor(game) {
    super("PLAYING");
    this.game = game;
  }
  draw() {
    drawPlayingScreen(this.game.context, this.game.entities, this.game.score);
  }
  enter() {
    this.draw();
    // start to play audio file
    const audioFile = document.querySelector("#audioPlayer audio");
    audioFile.currentTime = 0;
    audioFile.play();
  }
  update(deltaTime) {
    this.game.entities.forEach((entity) => {
      entity.state.update(deltaTime);
    });
  }
  handleInput() {
    this.game.entities.forEach((entity) =>
      entity.state.handleInput(this.game.frame)
    );
  }
}

export class GameOver extends GameState {
  constructor(game) {
    super("GAME_OVER");
    this.game = game;
  }
  draw() {
    drawGameOverScreen(this.game.context, this.game.entities, this.game.score);
    // Stop audio from playing
    const audioFile = document.querySelector("#audioPlayer audio");
    audioFile.pause();
  }
  enter() {
    this.draw();
  }
  update() {
    // nothing to update here
    return;
  }
  handleInput() {
    this.game.reset();
    this.game.entities.forEach((entity) => entity.reset());
    this.game.setGameState("PLAYING");
  }
}
