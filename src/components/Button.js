import { Circle } from "./Circle.js";

export class Button extends Circle {
  constructor(id, x, y, rad) {
    super(x, y, rad);
    this.id = id;
  }

  createButton(colour) {
    this.graphics = this.drawCircle(colour);
    this.enable();
    return this.graphics;
  }

  attachCb(cb) {
    this.graphics.on('click', cb);
  }

  enable() {
    this.graphics.interactive = true;
    this.graphics.buttonMode = true;
  }

  disable() {
    this.graphics.interactive = false;
    this.graphics.buttonMode = false;
  }
}