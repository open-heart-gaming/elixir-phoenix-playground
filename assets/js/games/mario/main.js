import './config';
import Game from './scenes/game';
import Lose from './scenes/lose';

loadSprite('tiles', './sprites/tilemap.png', {
  sliceX: 20,
  sliceY: 20,
  anims: {
    idle: { from: 300, to: 300 },
    run: { from: 301, to: 303 },
    jump: { from: 305, to: 305 },
  },
});
console.log('SPRITE LOADED');

layers(['obj', 'ui'], 'obj');

scene('game', Game);
scene('lose', Lose);

scene('main', () => {
  go('game', { level: 'levelOne', score: 0 });
});

export function startGame() {
  start('main');
}
