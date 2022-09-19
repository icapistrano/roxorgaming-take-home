import './css/style.css'

import { GameApp } from './components/GameApp.js';

const config = {
  app: {
    width: window.innerWidth,
    height: window.innerHeight,
    bg: 0x0f3422
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

  largeCircle: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2 - 150,
    rad: 200,
    initColour: 0xffffff
  },

  buttons: {
    colours: [0xff0000,0x0000ff, 0x00ff00, 0xffff00, 0xffa500], // red, blue, green, yellow, orange
    xPositions: [150, 300, 450, 600, 750],
    yPositions: 650,
    rad: 50
  }

}

const app = new GameApp(config);