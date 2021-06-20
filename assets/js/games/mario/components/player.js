import Event from '../event';

const MOVE_SPEED = 80;
const JUMP_FORCE = 280;
const BIG_JUMP_FORCE = 350;

export let players = {};
export let currentPlayer = {};
export let currentPlayerName = '';

export const createCurrentPlayer = (name) => {
  const newCurrentPlayer = createPlayer(name);

  currentPlayer = newCurrentPlayer;
  currentPlayerName = name;

  currentPlayer.action(() => {
    camPos(currentPlayer.pos);
  });

  return currentPlayer;
};

export const createPlayer = (name) => {
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

  const newPlayer = add([
    sprite('tiles', { animspeed: 0.1, frame: 300 }),
    pos(30, 30),
    body(),
    solid(),
    origin('bot'),
    big(),
    scale(1),
    'player',
    { name: name },
  ]);

  players[name] = newPlayer;

  handlePlayer(newPlayer);

  return newPlayer;
};

const handlePlayer = (player) => {
  keyDown('left', () => {
    Event.push('key_down_left', { name: currentPlayerName });
  });

  Event.handle('key_down_left', ({ name }) => {
    if (name == player.name) {
      player.move(-MOVE_SPEED, 0);
    }
  });

  keyDown('right', () => {
    Event.push('key_down_right', { name: currentPlayerName });
  });

  Event.handle('key_down_right', ({ name }) => {
    if (name == player.name) {
      player.move(MOVE_SPEED, 0);
    }
  });

  keyPress('left', () => {
    Event.push('key_press_left', { name: currentPlayerName });
  });

  Event.handle('key_press_left', ({ name }) => {
    if (name == player.name) {
      if (player.scale.x > 0) {
        player.scale.x *= -1;
      }
      player.play('run');
    }
  });

  keyPress('right', () => {
    Event.push('key_press_right', { name: currentPlayerName });
  });

  Event.handle('key_press_right', ({ name }) => {
    if (name == player.name) {
      if (player.scale.x < 0) {
        player.scale.x *= -1;
      }
      player.play('run');
    }
  });

  keyPress('space', () => {
    Event.push('key_press_space', { name: currentPlayerName });
  });

  Event.handle('key_press_space', ({ name }) => {
    if (name == player.name) {
      console.log(player.name);
      if (player.grounded()) {
        if (player.isBig()) {
          player.jump(BIG_JUMP_FORCE);
        } else {
          player.jump(JUMP_FORCE);
        }
        player.play('jump');
      }
    }
  });

  keyRelease('left', () => {
    Event.push('key_release_left', { name: currentPlayerName });
  });

  Event.handle('key_release_left', ({ name }) => {
    if (name == player.name) {
      player.play('idle');
    }
  });

  keyRelease('right', () => {
    Event.push('key_release_right', { name: currentPlayerName });
  });

  Event.handle('key_release_right', ({ name }) => {
    if (name == player.name) {
      player.play('idle');
    }
  });

  player.on('grounded', () => {
    player.play('idle');
  });
};
