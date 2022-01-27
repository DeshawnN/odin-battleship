const Gameboard = require('./Gameboard');
const Ship = require('./Ship');

test('Can place ship horizontally on gameboard', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0,0);

    expect(gameboard.ships.includes(ship)).toBe(true);
    expect(gameboard.board[0][0]).toEqual({ ship, position: 0});
    expect(gameboard.board[0][1]).toEqual({ ship, position: 1});
    expect(gameboard.board[0][2]).toEqual({ ship, position: 2});
});

test('Can place ship vertically on gameboard', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, 'vertical');

    expect(gameboard.ships.includes(ship)).toBe(true);
    expect(gameboard.board[0][0]).toEqual( { ship, position: 0 } );
    expect(gameboard.board[1][0]).toEqual( { ship, position: 1 } );
    expect(gameboard.board[2][0]).toEqual( { ship, position: 2 } );
});

test('Register attacks and misses', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0,0);
    gameboard.recieveAttack(0,0);
    gameboard.recieveAttack(1,0);

    expect(gameboard.getCoordInfo(0,0).ship.hits[0].hit).toBe(true);
    expect(gameboard.getCoordInfo(1,0).missed).toBe(true);
});

test('Register when all ships on a gameboard are sunk', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    const ship2 = Ship(3);

    gameboard.placeShip(ship, 0, 0);
    gameboard.placeShip(ship2, 1, 0);

    ship.setSunkStatus(true);
    ship2.setSunkStatus(true);

    expect(gameboard.allShipsSunk()).toBe(true);
});