class World {
  constructor() {
    this.players = [];
    this.startPosition = {
      x: 50,
      y: 50,
    };
  }

  createPlayer(playerId) {
    const playerObj = {
      playerId,
      x: this.startPosition.x,
      y: this.startPosition.y,
    };
    this.players.push(playerObj);
  }

  getPlayer(playerId) {
    return this.players.find(player => player.playerId === playerId);
  }

  removePlayer(playerId) {
    this.players.forEach((player, index) => {
      if (player.playerId === playerId) {
        this.players.splice(index, 1);
      }
    });
  }
}

module.exports = World;
