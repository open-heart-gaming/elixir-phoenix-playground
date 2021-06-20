import { startGame } from '../games/mario/main';
import Event from '../games/mario/event';

let Game = {
  mounted() {
    Event.handle = (event, func) => this.handleEvent(event, func);
    Event.push = (event, payload) =>
      this.pushEventTo('#game-canvas', event, payload);

    this.handleEvent('start_game', ({ current_player_name }) => {
      startGame(current_player_name);
    });
  },
};

export { Game };
