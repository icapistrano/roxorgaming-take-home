import { Graphics } from 'pixi.js';

export class Circle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;

    this.graphics = new Graphics();
  }

  drawCircle(colour) {
    this.graphics.clear();
    this.graphics.beginFill(colour);
    this.graphics.drawCircle(this.x, this.y, this.rad);
    return this.graphics;
  }
}