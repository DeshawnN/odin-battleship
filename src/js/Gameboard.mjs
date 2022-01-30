export default function Gameboard() {
    return {
        board: new Array(10).fill().map(() => new Array(10)),
        ships: [],
        missed: new Array(10).fill().map(() => new Array(10)),
        placeShip: function(ship, yCoord, xCoord, orientation) {
            if (orientation === 'vertical') {
                for (let i = 0; i < ship.getLength(); i++) {
                    this.board[yCoord + i][xCoord] = { ship, position: i};
                }
            } else {
                for (let i = 0; i < ship.getLength(); i++) {
                    this.board[yCoord][xCoord + i] = { ship, position: i};
                }
            }
            this.ships.push(ship);
        },
        recieveAttack: function(yCoord, xCoord) {
            if (!this.board[yCoord][xCoord]) {
                this.board[yCoord][xCoord] = { missed: true };
                return;
            }

            const position = this.board[yCoord][xCoord].position;
            this.board[yCoord][xCoord].ship.hit(position);
        },
        getCoordInfo: function(yCoord, xCoord) {
            return this.board[yCoord][xCoord];
        },
        allShipsSunk: function() {
            return this.ships.every(ship => ship.sunk);
        }
    }
}