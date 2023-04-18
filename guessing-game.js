function guessingGame(guess) {
  const randomInt = Math.floor(Math.random() * 100);
  let count = 0;
  let won = false;
  return function makeGuess(guess) {
    if(!won) {
      count += 1;
    if(guess === randomInt) {
      won = true;
      return `You win! You found ${guess} in ${count} guesses.`;
    }
    if(guess > randomInt) return `${guess} is too high!`;
    if(guess < randomInt) return `${guess} is too low!`;
    }
    return `The game is over, you already won!`;
  };
};

module.exports = { guessingGame };
