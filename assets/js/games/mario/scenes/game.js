import '../config';
import LevelOne from '../levels/level_one';
import LevelTwo from '../levels/level_two';
import LevelCfg from '../levels/level_cfg';
import Player from '../components/player';

const FALL_DEATH = 600;

export default function Game(args = {}) {
  const levels = {
    levelOne: LevelOne(),
    levelTwo: LevelTwo(),
  };

  const level = addLevel(levels[args.level], LevelCfg());

  const scoreLabel = add([
    text(args.score),
    pos(30, 6),
    layer('ui'),
    { value: args.score },
  ]);

  const player = Player();

  const isJumping = () => !player.grounded();

  // player.action(() => {
  //   if (player.pos.y >= FALL_DEATH) {
  //     go('lose', { score: scoreLabel.value });
  //   }
  // });

  action('player', (p) => {
    if (p.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value });
    }
  });

  player.on('headbump', (obj) => {
    if (obj.is('coin-surprise')) {
      level.spawn('$', obj.gridPos.sub(0, 1));
      destroy(obj);
      level.spawn('{', obj.gridPos.sub(0, 0));
    }

    if (obj.is('mushroom-surprise')) {
      level.spawn('#', obj.gridPos.sub(0, 1));
      destroy(obj);
      level.spawn('{', obj.gridPos.sub(0, 0));
    }
  });

  action('mushroom', (m) => {
    m.move(40, 0);
  });

  player.collides('mushroom', (m) => {
    player.biggify(10);
    destroy(m);
  });

  player.collides('coin', (c) => {
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
    destroy(c);
  });

  player.collides('pipe', () => {
    keyPress('down', () => {
      go('game', {
        level: nextLevel[args.level],
        score: scoreLabel.value,
      });
    });
  });

  const nextLevel = {
    levelOne: 'levelTwo',
    levelTwo: 'levelOne',
  };

  const ENEMY_SPEED = 30;

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0);
  });

  player.collides('dangerous', (d) => {
    if (isJumping()) {
      destroy(d);
    } else {
      go('lose', { score: scoreLabel.value });
    }
  });
}
