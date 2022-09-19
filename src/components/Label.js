import { Text, TextStyle, Container, TextMetrics, Graphics } from 'pixi.js';

export class Label {
  constructor(style, bg, position) {
    this.bg = bg;
    this.x = position.x;
    this.y = position.y;
    this.style = new TextStyle(style);

    this.label = new Container();
  }

  createLabel(msg) {
    this.text = this.createText(msg);
    this.textBg = this.createBox(msg, this.bg);

    // ordering matters
    this.label.addChild(this.textBg);
    this.label.addChild(this.text);

    return this.label;
  }

  createText(msg) {
    const text = new Text(msg, this.style);
    text.x = this.x;
    text.y = this.y;
    return text;
  }

  createBox(msg) {
    const { width, height } = new TextMetrics.measureText(msg, this.style);
    const rect = new Graphics();
    rect.lineStyle(this.bg.borderWidth, this.bg.borderColour, 1);
    rect.beginFill(this.bg.colour);
    rect.drawRect(this.x-this.bg.padding, this.y-this.bg.padding, width+(this.bg.padding*2), height+(this.bg.padding*2));
    rect.endFill();
    return rect;
  }

  updateText(msg) {
    const text = this.label.children[1];
    text.text = msg;
  }
}