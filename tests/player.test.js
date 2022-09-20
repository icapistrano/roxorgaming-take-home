import { Player } from "../src/components/Player";

test('player contains the correct scores', () => {
  const player = new Player();
  const score = 5;

  for (let i=0; i<score; i++) {
    player.incrementRoundScore();
    player.incrementTotalScore();
  }
  
  expect(player.roundScore).toBe(score);

  // new round
  player.resetRoundScore();

  for (let i=0; i<score; i++) {
    player.incrementRoundScore();
    player.incrementTotalScore();
  }

  expect(player.roundScore).toBe(score);
  expect(player.totalScore).toBe(10);
})