import { Circle } from "./Circle.js";

export class Button extends Circle {
  constructor(id, x, y, rad, app) {
    super(x, y, rad);
    this.id = id;
    this.app = app;
  }

  createButton(colour) {
    this.graphics = this.drawCircle(colour);
    this.graphics.on('click', () => {
      this.app.startRound(this.id);
    });

    this.enable();

    return this.graphics;
  }

  enable() {
    this.graphics.interactive = true;
    this.graphics.buttonMode = true;
  }

  disable() {
    this.graphics.interactive = false;
    this.graphics.buttonMode = true;
  }
}