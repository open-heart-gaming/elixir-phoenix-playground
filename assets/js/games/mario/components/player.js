import '../config';

const MOVE_SPEED = 80;
const JUMP_FORCE = 280;
const BIG_JUMP_FORCE = 350;

export default function Player() {
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
    'player',
  ]);

  player.action(() => {
    camPos(player.pos);
  });

  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown('right', () => {
    console.log(player);
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
      player.play('jump');
    }
  });

  keyRelease('left', () => player.play('idle'));

  keyRelease('right', () => player.play('idle'));

  player.on('grounded', () => {
    player.play('idle');
  });

  return player;
}
