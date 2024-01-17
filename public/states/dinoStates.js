import { GROUND_HEIGHT } from "../constants.js";
import {
  DINO_SPRITE_WALK_CYCLE,
  MAX_JUMPING_HEIGHT,
  RUNNING_HEIGHT,
} from "../entities/dino.js";

export const dinoStates = {
  RUNNING: 0,
  JUMPING: 1,
  FALLING: 2,
};

class DinoState {
  constructor(state) {
    this.state = state;
  }
}

export class DinoRunning extends DinoState {
  constructor(dino) {
    super("RUNNING");
    this.dino = dino;
    this.frame = 0;
  }
  enter() {
    this.dino.y = RUNNING_HEIGHT - GROUND_HEIGHT;
    this.dino.velocity = 0;
  }
  update(deltaTime) {
    if (this.dino.frameTimer > this.dino.frameInterval) {
      if (this.frame === DINO_SPRITE_WALK_CYCLE.length - 1) {
        this.frame = 0;
      }
      this.frame++;
      this.dino.sprite = DINO_SPRITE_WALK_CYCLE[this.frame];
      this.dino.frameTimer = 0;
    } else {
      this.dino.frameTimer += deltaTime;
    }
  }
  handleInput() {
    if (this.dino.closeToGround()) {
      // dino close to ground, jump possible
      this.dino.setState("JUMPING");
    }
  }
}

export class DinoJumping extends DinoState {
  constructor(dino) {
    super("JUMPING");
    this.dino = dino;
  }
  enter() {
    this.dino.velocity += this.dino.gravity;
    this.dino.y = this.dino.y + this.dino.velocity;
    this.dino.sprite = DINO_SPRITE_WALK_CYCLE[0];
  }
  update(deltaTime) {
    if (this.dino.y < MAX_JUMPING_HEIGHT) {
      // Dino has reached maximum height, start falling
      this.dino.setState("FALLING");
    } else {
      this.dino.velocity += this.dino.gravity;
      this.dino.y = this.dino.y + this.dino.velocity;
    }
  }
  handleInput() {
    // Player is locked in place while jumping
    // Additional inputs will have no effect
    return;
  }
}

export class DinoFalling extends DinoState {
  constructor(dino) {
    super("FALLING");
    this.dino = dino;
  }
  enter() {
    this.dino.velocity += -this.dino.gravity;
    this.dino.y = this.dino.y + this.dino.velocity;
  }
  update(deltaTime) {
    if (this.dino.closeToGround()) {
      // Close to ground level, start running again
      this.dino.setState("RUNNING");
    } else {
      this.dino.velocity += -this.dino.gravity;
      this.dino.y = this.dino.y + this.dino.velocity;
    }
  }
  handleInput() {
    // Player is locked in place while falling.
    // Additional inputs will not have any effect
    // during this state.
    return;
  }
}
