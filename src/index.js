import './css/style.css'

import { GameApp } from './components/GameApp.js';

const config = {
  app: {
    width: window.innerWidth,
    height: window.innerHeight,
    bg: 0xffff33
  },

  logic: {
    roundMS: 20000,
    guessMS: 2000,
    initScore: 0
  },

  text: {
    style: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0x000000,
    },
    bg: {
      colour: 0xffffff,
      borderWidth: 2,
      borderColour: 0x000000,
      padding:10
    },
    timeRemainingLabel: {
      x: 20,
      y: 20
    },
    playerScoreLabel: {
      x: 20,
      y: 80
    },
  },

  buttons: {
    red: 0xff0000,
    blue: 0x0000ff,
    green: 0x00ff00,
    yellow: 0xffff00,
    orange: 0xffa500
  }
}

const app = new GameApp(config);