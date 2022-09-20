import { Container, Graphics } from 'pixi.js';
import { Button } from './Button';
import { Label } from './Label';

export class Results {
  constructor(app, config) {
    this.app = app; // pass app as its part of app
    this.page = new Container();

    // background
    const bg = this.createBg(config.bg);
    this.page.addChild(bg);
    
    // final score label
    this.finalScoreLabel = this.setNewLabel(config.finalScore);
    this.page.addChild(this.finalScoreLabel.createLabel("Final Score: 10"));

    // play again button
    this.playAgainBtn = this.setNewButton(config.playAgain);
    this.playAgainBtn.createText("Play Again?", config.playAgain.textStyle);
    this.playAgainBtn.attachCb(this.resetRound);
    this.page.addChild(this.playAgainBtn.createButton(config.playAgain.colour));
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

  setNewLabel(config) {
    const label = new Label(
      config.textStyle, 
      config.background, 
      config.position
      );
    return label;
  }

  setNewButton(config) {
    const btn = new Button(
      'play-again-btn', 
      config.position.x, 
      config.position.y, 
      config.rad
      );
    return btn;
  }
}