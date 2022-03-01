export default function Gameboard() {

    function moveValidator(moveArr) {
        return moveArr.every(function(move) {
            return move === undefined;
        });
    };
    return {
        board: new Array(10).fill().map(() => new Array(10)),
        ships: [],
        missed: new Array(10).fill().map(() => new Array(10)),
        placeShip: function(ship, yCoord, xCoord, isVertical) {
            const length = ship.getLength();

            if (this.board[yCoord][xCoord]) return false;

            if (isVertical) {
                if (yCoord + length > 10) return false;

                const coords = [];
                for (let i = 0; i < ship.getLength(); i++) {
                    coords.push(this.board[yCoord + i][xCoord]);
                }

                const isvalidMove = moveValidator(coords);

                if (isvalidMove === false) return false;

                for (let i = 0; i < ship.getLength(); i++) {
                    this.board[yCoord + i][xCoord] = { ship, position: i};
                }
            } else {
                if (xCoord + length > 10) return false;

                const coords = [];
                for (let i = 0; i < ship.getLength(); i++) {
                    coords.push(this.board[yCoord][xCoord + i]);
                }

                const isvalidMove = moveValidator(coords);

                if (isvalidMove === false) return false;

                for (let i = 0; i < ship.getLength(); i++) {
                    this.board[yCoord][xCoord + i] = { ship, position: i};
                }
            }
            this.ships.push(ship);

            return true;
        },
        receiveAttack: function(yCoord, xCoord) {
            if (!this.board[yCoord][xCoord]) {
                this.board[yCoord][xCoord] = { missed: true };
                return;
            }

            if (this.board[yCoord][xCoord].missed) return;

            const position = this.board[yCoord][xCoord].position;
            this.board[yCoord][xCoord].ship.hit(position);
        },
        getCoordInfo: function(yCoord, xCoord) {
            return this.board[yCoord][xCoord];
        },
        allShipsSunk: function() {
            const allShipsSunk = this.ships.every(function(ship) {
                return ship.sunk === true;
            });
            return allShipsSunk;
        }
    }
}