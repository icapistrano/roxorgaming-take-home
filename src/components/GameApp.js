import { Application } from 'pixi.js';
import { Label } from "./Label.js";
import { Circle } from "./Circle.js";
import { Button } from "./Button.js";

export class GameApp extends Application{
  constructor(config) {
    super({
      width: config.app.width, 
      height: config.app.height, 
      backgroundColor: config.app.bg
    });

    this.config = config;

    document.body.appendChild(this.view);

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

      const button = new Button(i, x, y, rad);
      button.attachCb(() => this.guess(button.id));
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
    this.stage.addChild(obj);
  }

  getSeconds(ms) {
    return ms / 1000;
  }

  async generateRandomNum() {
    const min = 0;
    const max = this.buttons.length - 1;

    const response = await fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=${min}&max=${max}&count=1`);
    if (response.status === 200) {
      const data = await response.json();
      return data[0];
    }
    return Math.floor(Math.random() * (max - min) + min); 
  }

  startRound() {
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
      clearTimeout(this.circleSetTimeoutId);
    }, this.config.logic.roundMS);
  }

  updatePlayerScore() {
    this.playerScore += 1;
    this.playerScoreLabel.updateText(`Player Score: ${this.playerScore}`);
  }

  async guess(id) {
    const randomNum = await this.generateRandomNum();
    if (!this.gameStarted) this.startRound();

    this.buttons.forEach(btn => btn.disable()); // disable all buttons
    
    // iterate colours array and set colour to large circle
    this.circleSetIntervalId = setInterval(() => {
      this.currColour += 1;
      if (this.currColour >= this.buttons.length) this.currColour = 0;
      this.largeCircle.drawCircle(this.config.buttons.colours[this.currColour]);
    }, this.config.logic.guessMS / this.buttons.length)

    // reset buttons, interval, update player score, set large circle to random colour
    this.circleSetTimeoutId = setTimeout(() => {
      this.largeCircle.drawCircle(this.config.buttons.colours[randomNum]);
      if (id === randomNum) this.updatePlayerScore(id);
      this.buttons.forEach(btn => btn.enable());
      clearInterval(this.circleSetIntervalId);
    }, this.config.logic.guessMS);
  }
}