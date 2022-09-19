import { Text, Application, TextStyle } from 'pixi.js';
import { Label } from "./Label.js";

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
      `Time Remaining: ${this.roundTimer}`,
      config.text.style,
      config.text.bg,
      config.text.timeRemainingLabel 
      );

    this.add(this.timeRemainingLabel.label);

    // player score
    this.playerScore = config.logic.initScore;
    this.playerScoreLabel = new Label(
      `Player Score: ${this.playerScore}`, 
      config.text.style,
      config.text.bg,
      config.text.playerScoreLabel
      );
    this.add(this.playerScoreLabel.label);
  }

  add(obj) {
    this.app.stage.addChild(obj);
  }

  getSeconds(ms) {
    return ms / 1000;
  }
}