import { Text, TextStyle, Container, TextMetrics, Graphics } from 'pixi.js';

export class Label {
  constructor(msg, style, bg, position) {
    this.x = position.x;
    this.y = position.y;

    this.style = new TextStyle(style);

    this.label = new Container();
    this.text = this.createText(msg);
    this.textBg = this.createBox(msg, bg);

    // ordering matters
    this.label.addChild(this.textBg);
    this.label.addChild(this.text);
  }

  createText(msg) {
    const text = new Text(msg, this.style);
    text.x = this.x;
    text.y = this.y;
    return text;
  }

  createBox(msg, bg) {
    const { width, height } = new TextMetrics.measureText(msg, this.style);
    const rect = new Graphics();
    rect.lineStyle(bg.borderWidth, bg.borderColour, 1);
    rect.beginFill(bg.colour);
    rect.drawRect(this.x-bg.padding, this.y-bg.padding, width+(bg.padding*2), height+(bg.padding*2));
    rect.endFill();
    return rect;
  }
}