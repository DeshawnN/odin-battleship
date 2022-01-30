import Player from '../Player.mjs';
import Gameboard from '../Gameboard.mjs';

test('Player can attack gameboard', () => {
    const player = Player();
    const gameboard = Gameboard();

    player.sendAttack(gameboard, 0, 0);

    expect(gameboard.getCoordInfo(0, 0).missed).toBe(true);
});

test('Computer player can attack random coordinates', () => {
    const computer = Player();
    const gameboard = Gameboard();

    const {y, x} = computer.generateRandomCoords(gameboard);
    computer.sendAttack(gameboard, y, x);
    
    expect(gameboard.getCoordInfo(y,x).missed).toBe(true);
});