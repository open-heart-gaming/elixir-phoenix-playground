import '../config';
import LevelOne from '../levels/level_one';
import LevelTwo from '../levels/level_two';
import LevelCfg from '../levels/level_cfg';

export default function Game(args = {}) {
  const levels = {
    levelOne: LevelOne,
    levelTwo: LevelTwo,
  };

  const level = addLevel(levels[args.level], LevelCfg);

  const scoreLabel = add([
    text(args.score),
    pos(30, 6),
    layer('ui'),
    { value: args.score },
  ]);

  function big() {
    let timer = 0;
    let big = false;
    return {
      update() {
        if (big) {
          timer -= dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return big;
      },
      smallify() {
        this.scale = vec2(1);
        timer = 0;
        big = false;
      },
      biggify(time) {
        this.scale = vec2(2);
        timer = time;
        big = true;
      },
    };
  }

  const player = add([
    sprite('tiles', { animSpeed: 0.1, frame: 300 }),
    pos(30, 30),
    body(),
    origin('bot'),
    big(),
    scale(1),
  ]);

  let isJumping = false;

  player.action(() => {
    camPos(player.pos);
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  player.action(() => {
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value });
    }
  });

  const MOVE_SPEED = 80;
  const JUMP_FORCE = 280;
  const BIG_JUMP_FORCE = 350;
  const FALL_DEATH = 600;

  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0);
  });

  keyPress('left', () => {
    if (player.scale.x > 0) {
      player.scale.x *= -1;
    }
    player.play('run');
  });

  keyPress('right', () => {
    if (player.scale.x < 0) {
      player.scale.x *= -1;
    }
    player.play('run');
  });

  keyPress('space', () => {
    if (player.grounded()) {
      if (player.isBig()) {
        player.jump(BIG_JUMP_FORCE);
      } else {
        player.jump(JUMP_FORCE);
      }
      isJumping = true;
      player.play('jump');
    }
  });

  keyRelease('left', () => player.play('idle'));

  keyRelease('right', () => player.play('idle'));

  player.on('grounded', () => {
    player.play('idle');
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
    if (isJumping) {
      destroy(d);
    } else {
      go('lose', { score: scoreLabel.value });
    }
  });
}
