const LevelCfg = {
  width: 16,
  height: 16,
  x: [sprite('tiles', { frame: 276 }), solid()],
  z: [sprite('tiles', { frame: 85 }), solid()],
  '£': [sprite('tiles', { frame: 109 }), solid()],
  '=': [sprite('tiles', { frame: 71 }), solid()],
  '@': [sprite('tiles', { frame: 125 }), solid()],
  s: [sprite('tiles', { frame: 109 }), solid()],
  $: [sprite('tiles', { frame: 2 }), 'coin'],
  '%': [sprite('tiles', { frame: 47 }), solid(), 'coin-surprise'],
  '*': [sprite('tiles', { frame: 47 }), solid(), 'mushroom-surprise'],
  '{': [sprite('tiles', { frame: 9 }), solid()],
  '(': [sprite('tiles', { frame: 247 }), scale(vec2(2, 1)), solid(), 'pipe'],
  '^': [sprite('tiles', { frame: 320 }), 'dangerous'],
  '!': [sprite('tiles', { frame: 340 }), 'dangerous'],
  '#': [sprite('tiles', { frame: 42 }), body(), 'mushroom'],
};

export default LevelCfg;
