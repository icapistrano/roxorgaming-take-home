import { Circle } from "./Circle.js";
import { Text, TextStyle, TextMetrics } from 'pixi.js';


export class Button extends Circle {
  constructor(id, x, y, rad) {
    super(x, y, rad);
    this.id = id;

    this.TINT = 0x808080;
    this.UNTINT = 0xffffff;
  }

  createButton(colour) {
    this.graphics = this.drawCircle(colour);
    this.enable();
    return this.graphics;
  }

  createText(msg, style) {
    const textStyle = new TextStyle(style);
    const text = new Text(msg, textStyle);
    const { width, height } = new TextMetrics.measureText(msg, textStyle);
    text.x = this.x - (width/2); 
    text.y = this.y - (height/2);
    this.graphics.addChild(text);
  }

  attachCb(cb) {
    this.graphics.on('click', cb);
  }

  enable() {
    this.graphics.interactive = true;
    this.graphics.buttonMode = true;
    this.graphics.tint = this.UNTINT;
  }

  disable() {
    this.graphics.interactive = false;
    this.graphics.buttonMode = false;
    this.graphics.tint = this.TINT;
  }
}