import { Application } from 'pixi.js';
import { Label } from "./Label.js";
import { Circle } from "./Circle.js";
import { Button } from "./Button.js";
import { Results } from "./Results.js"; 
import { Player } from './Player.js';

export class GameApp extends Application{
  constructor(config) {
    super({
      width: config.app.width, 
      height: config.app.height, 
      backgroundColor: config.app.bg,
      antialias: true
    });

    this.config = config;

    document.body.appendChild(this.view);

    // contain player data
    this.player = new Player();
    this.roundsPlayed = 0;

    // time remaining text field
    this.roundTimer = this.getSeconds(config.logic.roundMS);
    this.timeRemainingLabel = new Label(
      config.text.style,
      config.text.bg,
      config.text.timeRemainingLabel 
      );

    this.add(this.timeRemainingLabel.createLabel(`Time Remaining: ${this.roundTimer}`));

    // player score text field
    this.playerScoreLabel = new Label( 
      config.text.style,
      config.text.bg,
      config.text.playerScoreLabel
      );

    this.add(this.playerScoreLabel.createLabel(`Round Score: ${this.player.roundScore}`));

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

    // results
    this.results = new Results(this);

    // logic
    this.gameStarted = false;
    this.roundCurrTime = 0; // keep track of current time elapsed, can be restarted
    this.guessCurrTime = 0;
    this.currColour = 0;
    this.chosenBtnId;
    this.chosenRandomNum;
  }

  add(obj) {
    this.stage.addChild(obj);
  }

  remove(obj) {
    this.stage.removeChild(obj);
  }

  getSeconds(ms) {
    return Math.floor(ms / 1000);
  }

  async generateRandomNum() {
    // if possible, get random number from api else generate random number
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
    this.ticker.add(this.gameLoop);
  }

  resetRound() {
    // reset game, player score, large circle, timers, labels, buttons and remove results page
    this.gameStarted = false;
    this.player.resetRoundScore();
    this.largeCircle.drawCircle(this.config.largeCircle.initColour);
    this.timeRemainingLabel.updateText(`Time Remaining: ${this.roundTimer}`);
    this.playerScoreLabel.updateText(`Round Score: ${this.config.logic.initScore}`);
    this.buttons.forEach(btn => btn.enable());
    this.remove(this.results.page);

    this.roundCurrTime = 0;
    this.guessCurrTime = 0;
  }

  updatePlayerScore() {
    this.player.incrementRoundScore();
    this.player.incrementTotalScore();
    this.playerScoreLabel.updateText(`Round Score: ${this.player.roundScore}`);
  }

  async guess(id) {
    this.buttons.forEach(btn => btn.disable()); // disable all buttons

    if (!this.gameStarted) this.startRound();

    this.chosenBtnId = id;
    this.chosenRandomNum = await this.generateRandomNum();

    // dont start guess if not enough timer on round
    if (this.roundTimer - this.getSeconds(this.roundCurrTime) >= this.getSeconds(this.config.logic.guessMS)) {
      this.ticker.add(this.guessLoop);
    }
  }

  gameLoop = () => {
    this.roundCurrTime += this.ticker.elapsedMS;

    const passedS = this.getSeconds(this.config.logic.roundMS - this.roundCurrTime);
    this.timeRemainingLabel.updateText(`Time Remaining: ${passedS}`);

    // end round: remove ticker, update rounds and labels
    if (passedS <= 0) {
      this.ticker.remove(this.gameLoop);
      this.ticker.remove(this.guessLoop)
      this.roundsPlayed += 1;
      this.results.updateLabels();
      this.add(this.results.page);
    }
  }

  guessLoop = () => {
    this.guessCurrTime += this.ticker.elapsedMS;

    const passedS = this.getSeconds(this.config.logic.guessMS - this.guessCurrTime);

    // iterate colour for large circle
    this.currColour += 1;
    if (this.currColour >= this.buttons.length) this.currColour = 0;
    this.largeCircle.drawCircle(this.config.buttons.colours[this.currColour]);

    // end guess: remove ticker, draw final large circle's colour, update scores, restart counter
    if (passedS <= 0) {
      this.ticker.remove(this.guessLoop);
      this.largeCircle.drawCircle(this.config.buttons.colours[this.chosenRandomNum]);
      this.buttons.forEach(btn => btn.enable());
      this.guessCurrTime = 0;
      if (this.chosenBtnId === this.chosenRandomNum) this.updatePlayerScore();
    }
  }
}