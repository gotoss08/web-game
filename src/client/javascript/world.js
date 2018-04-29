class World {
  constructor() {
    this.players = [];
  }

  createPlayer(playerId, x, y) {
    let player = new PIXI.Sprite(resources['player'].texture);
    player.name = playerId;
    player.x = x;
    player.y = y;
    player.scale.set(SCALE_PLAYERS);
    app.stage.addChild(player);

    this.players.push(playerId);
  }

  getPlayer(playerId) {
    return app.stage.getChildByName(playerId);
  }

  removePlayer(playerId) {
    app.stage.removeChild(this.getPlayer(playerId));

    this.players.some((_playerId, index) => {
      if (_playerId == playerId) {
        this.players.splice(index, 1);
        return true;
      }
    });
  }

  updatePlayers(playersList) {
    const updatedPlayers = [];
    playersList.forEach((player) => {
      if (!this.players.includes(player.playerId)) {
        this.createPlayer(player.playerId, player.x, player.y);
      } else {
        let localPlayer = this.getPlayer(player.playerId);

        let localPlayerPosition = {
          x: localPlayer.x,
          y: localPlayer.y,
        };

        let tween = new TWEEN.Tween(localPlayerPosition)
          .to({
            x: player.x,
            y: player.y,
          })
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate(() => {
            localPlayer.x = localPlayerPosition.x;
            localPlayer.y = localPlayerPosition.y;
          })
          .start();

        updatedPlayers.push(player.playerId);
      }

      this.players.forEach((playerId) => {
        if (!updatedPlayers.includes(playerId)) this.removePlayer(playerId);
      });
    });

    this.players.forEach(playerId => app.stage.removeChild(this.getPlayer(playerId)));
    this.players.length = 0;

    playersList.forEach(player => this.createPlayer(player.playerId, player.x, player.y));
  }
}
