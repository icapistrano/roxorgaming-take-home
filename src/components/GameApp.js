import { Application } from 'pixi.js';
import { Label } from "./Label.js";
import { Circle } from "./Circle.js";
import { Button } from "./Button.js";

export class GameApp {
  constructor(config) {
    this.app = new Application({
      width: config.app.width, 
      height: config.app.height, 
      backgroundColor: config.app.bg
    });

    document.body.appendChild(this.app.view);

    // time remaining text field
    this.roundTimer = this.getSeconds(config.logic.roundMS);
    this.timeRemainingLabel = new Label(
      config.text.style,
      config.text.bg,
      config.text.timeRemainingLabel 
      );

    this.add(this.timeRemainingLabel.createLabel(`Time Remaining: ${this.roundTimer}`));

    // player score
    this.playerScore = config.logic.initScore;
    this.playerScoreLabel = new Label( 
      config.text.style,
      config.text.bg,
      config.text.playerScoreLabel
      );

    this.add(this.playerScoreLabel.createLabel(`Player Score: ${this.playerScore}`));

    // large circle
    this.largeCircle = new Circle(
      config.largeCircle.x,
      config.largeCircle.y,
      config.largeCircle.rad
    )

    this.add(this.largeCircle.drawCircle(config.largeCircle.initColour));

    // buttons
    const buttons = [];
    for (let i=0; i<config.buttons.colours.length; i++) {
      const colour = config.buttons.colours[i];
      const x = config.buttons.xPositions[i];
      const y = config.buttons.yPositions;
      const rad = config.buttons.rad

      const button = new Button(i, x, y, rad, this);
      buttons.push(buttons)
      this.add(button.createButton(colour));
    }

  }

  add(obj) {
    this.app.stage.addChild(obj);
  }

  getSeconds(ms) {
    return ms / 1000;
  }
}