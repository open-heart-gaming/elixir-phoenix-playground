import { startGame } from '../games/mario/main';

let Game = {
  mounted() {
    startGame();
  },
};

export { Game };
