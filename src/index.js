import './css/style.css'

import { GameApp } from './components/GameApp.js';

const config = {
  app: {
    width: 800,
    height: 800,
    bg: 0x0f3422
  },

  logic: {
    roundMS: 10000,
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
      padding:20
    },
    timeRemainingLabel: { x: 40, y: 40 },
    playerScoreLabel: { x: 40, y: 120 },
    roundScoreLabel: { x: 40, y: 40 },
    totalScoreLabel: { x: 40, y: 120 }
  },

  largeCircle: {
    x: 400,
    y: 375,
    rad: 200,
    initColour: 0xffffff
  },

  buttons: {
    colours: [0xff0000,0x0000ff, 0x00ff00, 0xffff00, 0xffa500], // red, blue, green, yellow, orange
    xPositions: [100, 250, 400, 550, 700],
    yPositions: 675,
    rad: 50
  },

  playAgainBtn: {
    rad: 100,
    colour: 0xff2222,
    textStyle: {
      fontFamily: 'Arial',
      fontSize: 26,
      fill: 0x000000,
    },
    position: { x: 400, y: 400}
  },

  results: {
    bg: 0x0f3422,
  }
}

const app = new GameApp(config);