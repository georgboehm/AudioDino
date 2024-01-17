export const cactusStates = {
  DEFAULT: 0,
};

class CactusState {
  constructor(state) {
    this.state = state;
  }
}

export class CactusDefault extends CactusState {
  constructor(cactus) {
    super("DEFAULT");
    this.cactus = cactus;
  }
  enter() {
    return;
  }
  handleInput() {
    return;
  }
  update(deltaTime) {
    if (this.cactus.frameTimer > this.cactus.frameInterval) {
      this.cactus.x = this.cactus.x - 20;
      this.cactus.frameTimer = 0;
    } else {
      this.cactus.frameTimer += deltaTime;
    }
  }
}
