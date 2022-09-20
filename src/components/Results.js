import { Container, Graphics } from 'pixi.js';
import { Button } from './Button';
import { Label } from './Label';

export class Results {
  constructor(app) {
    this.app = app; // pass app as its part of app
    this.page = new Container();

    // background
    const bg = this.createBg(this.app.config.results.bg);
    this.page.addChild(bg);
    
    // round score label
    this.roundScoreLabel = new Label(
      this.app.config.text.style,
      this.app.config.text.bg,
      this.app.config.text.roundScoreLabel 
      );
    this.page.addChild(this.roundScoreLabel.createLabel(`Round Score: ${this.app.player.roundScore}`));

    // total score label
    this.totalScoreLabel = new Label(
      this.app.config.text.style,
      this.app.config.text.bg,
      this.app.config.text.totalScoreLabel 
    );
    this.page.addChild(this.totalScoreLabel.createLabel(`Total Score: ${this.app.player.totalScore}`));

    // games played label
    this.roundsPlayedLabel = new Label(
      this.app.config.text.style,
      this.app.config.text.bg,
      this.app.config.text.roundsPlayedLabel 
    );
    this.page.addChild(this.roundsPlayedLabel.createLabel(`Total Rounds: ${this.app.roundsPlayed}`));


    // play again button
    this.playAgainBtn = new Button(
      'play-again-btn', 
      this.app.config.playAgainBtn.position.x, 
      this.app.config.playAgainBtn.position.y, 
      this.app.config.playAgainBtn.rad
      );;
    this.playAgainBtn.createText("Play Again?", this.app.config.playAgainBtn.textStyle);
    this.playAgainBtn.attachCb(this.resetRound);
    this.page.addChild(this.playAgainBtn.createButton(this.app.config.playAgainBtn.colour));
  }

  // need this, else button will refer this to its graphics for passing cb
  resetRound = () => {
    this.app.resetRound();
  }

  createBg(colour) {
    const bg = new Graphics();
    bg.beginFill(colour);
    bg.drawRect(0, 0, window.innerWidth, window.innerHeight);
    bg.endFill();
    return bg;
  }

  updateLabels() {
    this.roundScoreLabel.updateText(`Round Score: ${this.app.player.roundScore}`);
    this.totalScoreLabel.updateText(`Total Score: ${this.app.player.totalScore}`);
    this.roundsPlayedLabel.updateText(`Total Rounds: ${this.app.roundsPlayed}`)
  }
}