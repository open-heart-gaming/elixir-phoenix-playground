import kaboom from 'kaboom/dist/kaboom';
import asepritePlugin from 'kaboom/dist/plugins/aseprite';
import peditPlugin from 'kaboom/dist/plugins/pedit';

const canvas = document.getElementById('game-canvas');

kaboom({
  canvas: canvas,
  global: true,
  plugins: [asepritePlugin, peditPlugin],
  width: 320,
  height: 320,
  scale: 3,
  crisp: true,
  clearColor: [0, 0, 0, 1],
});
