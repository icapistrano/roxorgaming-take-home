import { Application } from 'pixi.js';
import { Label } from "./Label.js";
import { Circle } from "./Circle.js";
import { Button } from "./Button.js";

export class GameApp {
  constructor(config) {
    this.config = config;

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
    this.buttons = [];
    for (let i=0; i<config.buttons.colours.length; i++) {
      const colour = config.buttons.colours[i];
      const x = config.buttons.xPositions[i];
      const y = config.buttons.yPositions;
      const rad = config.buttons.rad

      const button = new Button(i, x, y, rad, this);
      this.buttons.push(button);
      this.add(button.createButton(colour));
    }

    // logic
    this.gameStarted = false;
    this.roundSetTimeoutId;
    this.roundSetIntervalId;
    this.roundTracker = this.roundTimer;

    this.currColour = 0;
    this.circleSetIntervalId;
    this.circleSetTimeoutId;
  }

  add(obj) {
    this.app.stage.addChild(obj);
  }

  getSeconds(ms) {
    return ms / 1000;
  }

  getMs(seconds) {
    return seconds * 1000;
  }

  generateRandomNum() {
    return Math.round(Math.random() * this.buttons.length - 1);
  }

  startRound(id) {
    if (!this.gameStarted) {
      this.gameStarted = true;

      // change label text every second
      this.roundSetIntervalId = setInterval(() => {
        this.roundTracker -= 1;
        this.timeRemainingLabel.updateText(`Time Remaining: ${this.roundTracker}`);
      }, 1000);

      // start timer for round
      this.roundSetTimeoutId = setTimeout(() => {
        clearInterval(this.roundSetIntervalId);
        clearInterval(this.circleSetIntervalId);
      }, this.getMs(this.roundTimer));
    }

    this.buttons.forEach(btn => btn.disable()); // disable all buttons
    
    // iterate colours
    this.circleSetIntervalId = setInterval(() => {
      this.currColour += 1;
      if (this.currColour >= this.buttons.length) this.currColour = 0;

      this.largeCircle.drawCircle(this.config.buttons.colours[this.currColour]);
    }, this.config.logic.guessMS / this.buttons.length)

    // get random number after x seconds
    this.circleSetTimeoutId = setTimeout(() => {
      clearInterval(this.circleSetIntervalId);

      this.buttons.forEach(btn => btn.enable()); // enable all buttons

      // update score
      if (id === this.generateRandomNum()) {
        this.largeCircle.drawCircle(this.config.buttons.colours[id])
        this.playerScore += 1;
        this.playerScoreLabel.updateText(`Player Score: ${this.playerScore}`);
      }
    }, this.config.logic.guessMS);
  }
}