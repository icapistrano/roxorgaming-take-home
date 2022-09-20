// hold data such as score and additional data

export class Player {
  constructor() {
    this.roundScore = 0;
    this.totalScore = 0;
    this.roundsPlayed = 0;
  }

  incrementRoundScore() {
    this.roundScore += 1;
  }

  incrementTotalScore() {
    this.totalScore += 1;
  }

  resetRoundScore() {
    this.roundScore = 0;
  }
}