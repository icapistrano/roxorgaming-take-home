import './css/style.css'

import { GameApp } from './components/GameApp.js';

const config = {
  app: {
    width: 800,
    height: 800,
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
    x: 400,
    y: 300,
    rad: 200,
    initColour: 0xffffff
  },

  buttons: {
    colours: [0xff0000,0x0000ff, 0x00ff00, 0xffff00, 0xffa500], // red, blue, green, yellow, orange
    xPositions: [100, 250, 400, 550, 700],
    yPositions: 650,
    rad: 50
  },

  results: {
    bg: 0x0f3422,
    finalScore: {
      textStyle: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000,
      },
      background: {
        colour: 0xffffff,
        borderWidth: 0,
        borderColour: 0xffffff,
        padding:10
      },
      position: {
        x: 20,
        y: 20
      }
    },
    playAgain: {
      rad: 100,
      colour: 0xff2222,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: 26,
        fill: 0x000000,
      },
      position: {
        x: 400,
        y: 400
      }
    }
  }
}

const app = new GameApp(config);