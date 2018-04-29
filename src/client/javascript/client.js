const world = new World();
let socket;

const setup = function () {
  socket = io();

  socket.on('createPlayer', (data) => {
    world.createPlayer(data.playerId, data.x, data.y);
  });

  socket.on('removePlayer', (data) => {
    world.removePlayer(data.playerId);
  });

  socket.on('updatePlayers', (data) => {
    world.updatePlayers(data.playersList);
  });

  // let player = new PIXI.Sprite(resources['player'].texture);
  // player.name = 'player';
  // player.scale.set(5);
  // player.x = -5;

  // app.stage.addChild(player);

  app.ticker.add(delta => TWEEN.update());
  app.ticker.add(delta => gameloop(delta))
};

PIXI.loader
  .add('player', '../images/player.png')
  .load(setup);

const move = function move(direction) {
  const commandObj = {
    type: 'move',
    direction,
  };

  console.log(`moving ${direction}`);
  

  socket.emit('command', commandObj);
};

const gameloop = function gameloop(delta) {
  if (keyboard.keys['w']) move('up');
  if (keyboard.keys['s']) move('down');
  if (keyboard.keys['a']) move('left');
  if (keyboard.keys['d']) move('right');
};
