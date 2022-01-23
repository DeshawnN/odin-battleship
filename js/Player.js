function Player() {
    return {
        sendAttack: function(gameboard, yCoord, xCoord) {
            gameboard.recieveAttack(yCoord, xCoord);
        },
        generateRandomCoords: function(gameboard) {
            const length = gameboard.board.length;
            const y = Math.floor(Math.random() * length);
            const x = Math.floor(Math.random() * length);

            return { x, y }
        }
    }
}

module.exports = Player;