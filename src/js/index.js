import Player from './Player.mjs';
import Gameboard from './Gameboard.mjs';
import Ship from './Ship.mjs';
import Renderer from './dom-renderer.mjs';


gameStart();

setupButtons();

function setupButtons() {
    document.querySelector('[data-reset]').addEventListener('click', () => {
        gameStart();
        console.clear();
    });
}

function gameStart() {
    const player = createPlayer();
    player.generateShips();

    const computer = createPlayer();
    computer.generateShips();

    const playerArea = document.querySelector('.player');
    Renderer.renderGameBoard(player.gameBoard, 'player', playerArea);
    
    const computerArea = document.querySelector('.computer');
    Renderer.renderGameBoard(computer.gameBoard, 'enemy', computerArea);

    addEventListeners(computerArea, player, computer);
}


function playerTurn(cell, player, enemy) {
    const [y, x] = cell.getAttribute('data-coordinates').split(',');
    player.sendAttack(enemy.gameBoard, y, x);
    Renderer.renderGameBoard(enemy.gameBoard, 'enemy', document.querySelector('.computer'));
}

function computerTurn(player, enemy) {
    const {y, x} = player.generateRandomCoords(enemy.gameBoard);
    player.cpuAttack(enemy.gameBoard);
    Renderer.renderGameBoard(enemy.gameBoard, 'player', document.querySelector('.player'));
}

function addEventListeners(element, player, computer) {
    const cells = element.querySelectorAll('.grid-column');

    cells.forEach(cell => {
        if (cell.children.length > 0) return;
        cell.addEventListener('click', clickEvent.bind(this, cell));
    })

    function clickEvent(cell) {
        playerTurn(cell, player, computer);

        if (computer.gameBoard.allShipsSunk()) {
            setTimeout(() => {
                gameEnd("You");
            }, 100);
            return;
        }

        computerTurn(computer, player);

        if (player.gameBoard.allShipsSunk()) {
            setTimeout(() => {
                gameEnd("The Computer");

            }, 100);
            return;
        }

        addEventListeners(element, player, computer);
    }
}

function gameEnd(winner) {
    alert(`Game Over! ${winner} won!`);
}

function createPlayer() {
    const { sendAttack, generateRandomCoords } = Player();
    return {
        sendAttack,
        generateRandomCoords,
        cpuAttack: function(gameboard) {
            let attackSuccessful = false;
            
            while (!attackSuccessful) {
                const {y, x} = this.generateRandomCoords(gameboard);

                const coordInfo = gameboard.getCoordInfo(y, x);
                if (coordInfo) {
                    if (coordInfo.missed) {
                        console.log("debug: coord already registered as missed");
                        continue;
                    }
                    if (coordInfo.ship) {
                        if (coordInfo.ship.hits[coordInfo.position].hit) {
                            console.log("debug: coord already registered as hit");
                            continue;
                        }
                    }
                }
                this.sendAttack(gameboard, y, x);
                console.log(`debug: Computer attacked ${y},${x}`);

                attackSuccessful = true;
            }
        },
        gameBoard: Gameboard(),
        resetBoard: function() {
            this.gameBoard = GameBoard();
        },
        generateShips: function() {
            let carrierPlaced = false;
            while (carrierPlaced === false) {
                const {y, x} = generateRandomCoords(this.gameBoard);
                const isVertical = Math.floor(Math.random() * 2);
                carrierPlaced = this.gameBoard.placeShip(Ship(5), y, x, isVertical);
            }

            let battleshipPlaced = false;
            while (battleshipPlaced === false) {
                const {y, x} = generateRandomCoords(this.gameBoard);
                const isVertical = Math.floor(Math.random() * 2);
                battleshipPlaced = this.gameBoard.placeShip(Ship(4), y, x, isVertical);
            }

            let destroyerPlaced = false;
            while (destroyerPlaced === false) {
                const {y, x} = generateRandomCoords(this.gameBoard);
                const isVertical = Math.floor(Math.random() * 2);
                destroyerPlaced = this.gameBoard.placeShip(Ship(3), y, x, isVertical);
            }

            let submarinePlaced = false;
            while (submarinePlaced === false) {
                const {y, x} = generateRandomCoords(this.gameBoard);
                const isVertical = Math.floor(Math.random() * 2);
                submarinePlaced = this.gameBoard.placeShip(Ship(3), y, x, isVertical);
            }

            let patrolBoatPlaced = false;
            while (patrolBoatPlaced === false) {
                const {y, x} = generateRandomCoords(this.gameBoard);
                const isVertical = Math.floor(Math.random() * 2);
                patrolBoatPlaced = this.gameBoard.placeShip(Ship(2), y, x, isVertical);
            }
        },
    }
}


