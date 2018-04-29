const socketio = require('socket.io');
const uniqid = require('uniqid');

const World = require('./world');
const WorldConfig = require('./world.config');

const world = new World();

let io;

const updatePlayers = function updatePlayers() {
  const playersList = [];
  world.players.forEach(player => playersList.push({ playerId: player.playerId, x: player.x, y: player.y }));
  io.emit('updatePlayers', { playersList });
};

const processMoveCommand = function processMoveCommand(moveCommand) {
  const player = world.getPlayer(moveCommand.playerId);
  if (!player) return;

  switch (moveCommand.direction) {
    case 'up':
      player.y -= WorldConfig.playerSpeed;
      break;
    case 'down':
      player.y += WorldConfig.playerSpeed;
      break;
    case 'left':
      player.x -= WorldConfig.playerSpeed;
      break;
    case 'right':
      player.x += WorldConfig.playerSpeed;
      break;
    default:
      break;
  }

  updatePlayers();
};

const processCommand = function processCommand(playerId, command) {
  switch (command.type) {
    case 'move':
      processMoveCommand({
        playerId,
        direction: command.direction,
      });
      break;
    default: break;
  }
};

const init = function init(httpServer) {
  io = socketio(httpServer);
  console.log('game server init');

  io.on('connection', (socket) => {
    const playerId = uniqid();
    socket.playerId = playerId;

    console.log(`user connected, assigned to player id: ${socket.playerId}`);

    world.createPlayer(playerId);
    io.emit('createPlayer', { playerId, x: world.startPosition.x, y: world.startPosition.y });

    updatePlayers();

    socket.on('command', (command) => {
      processCommand(playerId, command);
    });

    socket.on('disconnect', () => {
      world.removePlayer(playerId);
      io.emit('removePlayer', { playerId });
    });
  });
};

module.exports = init;
