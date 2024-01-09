class Entity {
  constructor(
    x,
    y,
    spriteSheet, // collection of all sprites for an entity
    sprite, // current sprite to be drawn on the canvas
    spriteWidth,
    spriteHeight,
    renderWidth,
    renderHeight
  ) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.sprite = sprite;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.renderWidth = renderWidth;
    this.renderHeight = renderHeight;
  }

  // Draw Entity on canvas
  draw(context) {
    context.drawImage(
      this.spriteSheet,
      this.sprite.x,
      this.sprite.y,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.renderWidth,
      this.renderHeight
    );
  }
}

export default Entity;
