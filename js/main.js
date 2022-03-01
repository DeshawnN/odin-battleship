/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Gameboard.js":
/*!*****************************!*\
  !*** ./src/js/Gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nfunction Gameboard() {\n\n    function moveValidator(moveArr) {\n        return moveArr.every(function(move) {\n            return move === undefined;\n        });\n    };\n    return {\n        board: new Array(10).fill().map(() => new Array(10)),\n        ships: [],\n        missed: new Array(10).fill().map(() => new Array(10)),\n        placeShip: function(ship, yCoord, xCoord, isVertical) {\n            const length = ship.getLength();\n\n            if (this.board[yCoord][xCoord]) return false;\n\n            if (isVertical) {\n                if (yCoord + length > 10) return false;\n\n                const coords = [];\n                for (let i = 0; i < ship.getLength(); i++) {\n                    coords.push(this.board[yCoord + i][xCoord]);\n                }\n\n                const isvalidMove = moveValidator(coords);\n\n                if (isvalidMove === false) return false;\n\n                for (let i = 0; i < ship.getLength(); i++) {\n                    this.board[yCoord + i][xCoord] = { ship, position: i};\n                }\n            } else {\n                if (xCoord + length > 10) return false;\n\n                const coords = [];\n                for (let i = 0; i < ship.getLength(); i++) {\n                    coords.push(this.board[yCoord][xCoord + i]);\n                }\n\n                const isvalidMove = moveValidator(coords);\n\n                if (isvalidMove === false) return false;\n\n                for (let i = 0; i < ship.getLength(); i++) {\n                    this.board[yCoord][xCoord + i] = { ship, position: i};\n                }\n            }\n            this.ships.push(ship);\n\n            return true;\n        },\n        receiveAttack: function(yCoord, xCoord) {\n            if (!this.board[yCoord][xCoord]) {\n                this.board[yCoord][xCoord] = { missed: true };\n                return;\n            }\n\n            if (this.board[yCoord][xCoord].missed) return;\n\n            const position = this.board[yCoord][xCoord].position;\n            this.board[yCoord][xCoord].ship.hit(position);\n        },\n        getCoordInfo: function(yCoord, xCoord) {\n            return this.board[yCoord][xCoord];\n        },\n        allShipsSunk: function() {\n            const allShipsSunk = this.ships.every(function(ship) {\n                return ship.sunk === true;\n            });\n            return allShipsSunk;\n        }\n    }\n}\n\n//# sourceURL=webpack://odin-battleship/./src/js/Gameboard.js?");

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nfunction Player() {\n    return {\n        sendAttack: function(gameboard, yCoord, xCoord) {\n            gameboard.receiveAttack(yCoord, xCoord);\n        },\n        generateRandomCoords: function(gameboard) {\n            const length = gameboard.board.length;\n            const y = Math.floor(Math.random() * length);\n            const x = Math.floor(Math.random() * length);\n\n            return { y, x }\n        }\n    }\n}\n\n//# sourceURL=webpack://odin-battleship/./src/js/Player.js?");

/***/ }),

/***/ "./src/js/Ship.js":
/*!************************!*\
  !*** ./src/js/Ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(length) {\n    return {\n        length,\n        hits: new Array(length).fill().map(() => ({ hit: false })),\n        sunk: false,\n        getLength: function() {\n            return this.length;\n        },\n        hit: function(position) {\n            if (position > length || position < 0) return;\n            this.hits[position].hit = true;\n            this.isSunk();\n        },\n        isSunk: function() {\n            const sunkStatus = this.hits.every((position) => position.hit);\n            if (sunkStatus) {\n                this.setSunkStatus(true);\n            }\n        },\n        setSunkStatus: function(sunkStatus) {\n            this.sunk = sunkStatus;\n        }\n    }\n}\n\n//# sourceURL=webpack://odin-battleship/./src/js/Ship.js?");

/***/ }),

/***/ "./src/js/dom-renderer.js":
/*!********************************!*\
  !*** ./src/js/dom-renderer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction renderGameBoard(boardData, boardType, html) {\n    let board = document.createElement('div');\n    board.classList.add('grid');\n\n    const gameboard = boardData.board; \n    for (let rows = 0; rows < gameboard.length; rows++) {\n        \n        const row = document.createElement('div');\n        row.classList.add('rows', 'grid');\n        for (let cols = 0; cols < gameboard.length; cols++) {\n            let col = document.createElement('div');\n            col.classList.add('grid-column');\n            col.setAttribute('data-coordinates', `${rows},${cols}`);\n\n            const coordData = boardData.getCoordInfo(rows,cols);\n\n            if (boardType == 'player') {\n                if (coordData) {\n                    if (coordData.ship) {\n                        const shipIndicator = document.createElement('div');\n                        shipIndicator.classList.add('ship');\n                        col.appendChild(shipIndicator);\n                    }\n                }\n            }\n\n            if (coordData) {\n                if (coordData.missed) {\n                    if (coordData.missed) {\n                        const missedIndicator = document.createElement('div');\n                        missedIndicator.classList.add('indicator', 'missed');\n                        col.appendChild(missedIndicator);\n                    }\n                }\n\n                if (coordData.ship) {\n                    if (coordData.ship.hits[coordData.position].hit) {\n                        const hitIndicator = document.createElement('div');\n                        hitIndicator.classList.add('indicator', 'hit');\n                        col.appendChild(hitIndicator);\n                    }\n                }\n            }\n\n            row.appendChild(col);\n        }\n        board.appendChild(row);\n    }\n\n    html.innerHTML = '';\n    html.appendChild(board);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    renderGameBoard,\n});\n\n//# sourceURL=webpack://odin-battleship/./src/js/dom-renderer.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./src/js/Player.js\");\n/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard.js */ \"./src/js/Gameboard.js\");\n/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship.js */ \"./src/js/Ship.js\");\n/* harmony import */ var _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-renderer.js */ \"./src/js/dom-renderer.js\");\n\n\n\n\n\n\ngameStart();\nsetupButtons();\n\nfunction setupButtons() {\n    document.querySelector('[data-reset]').addEventListener('click', () => {\n        gameStart();\n        console.clear();\n    });\n}\n\nfunction gameStart() {\n    const player = createPlayer();\n\n    const computer = createPlayer();\n    computer.generateShips();\n\n    const playerArea = document.querySelector('.player');\n    _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGameBoard(player.gameBoard, 'player', playerArea);\n    generateShipyard(player);\n    addDragDropListeners(player);\n    \n    const computerArea = document.querySelector('.computer');\n    _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGameBoard(computer.gameBoard, 'enemy', computerArea);\n\n    addEventListeners(computerArea, player, computer);\n}\n\n\nfunction playerTurn(cell, player, enemy) {\n    const [y, x] = cell.getAttribute('data-coordinates').split(',');\n    player.sendAttack(enemy.gameBoard, y, x);\n    _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGameBoard(enemy.gameBoard, 'enemy', document.querySelector('.computer'));\n}\n\nfunction computerTurn(player, enemy) {\n    const {y, x} = player.generateRandomCoords(enemy.gameBoard);\n    player.cpuAttack(enemy.gameBoard);\n    _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGameBoard(enemy.gameBoard, 'player', document.querySelector('.player'));\n}\n\nfunction addEventListeners(element, player, computer) {\n    const cells = element.querySelectorAll('.grid-column');\n\n    cells.forEach(cell => {\n        if (cell.children.length > 0) return;\n        cell.addEventListener('click', clickEvent.bind(this, cell));\n    })\n\n    function clickEvent(cell) {\n        playerTurn(cell, player, computer);\n\n        if (computer.gameBoard.allShipsSunk()) {\n            setTimeout(() => {\n                gameEnd(\"You\");\n            }, 100);\n            return;\n        }\n\n        computerTurn(computer, player);\n\n        if (player.gameBoard.allShipsSunk()) {\n            setTimeout(() => {\n                gameEnd(\"The Computer\");\n\n            }, 100);\n            return;\n        }\n\n        addEventListeners(element, player, computer);\n    }\n}\n\nfunction gameEnd(winner) {\n    alert(`Game Over! ${winner} won!`);\n}\n\nfunction createPlayer() {\n    const { sendAttack, generateRandomCoords } = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    return {\n        sendAttack,\n        generateRandomCoords,\n        cpuAttack: function(gameboard) {\n            let attackSuccessful = false;\n            \n            while (!attackSuccessful) {\n                const {y, x} = this.generateRandomCoords(gameboard);\n\n                const coordInfo = gameboard.getCoordInfo(y, x);\n                if (coordInfo) {\n                    if (coordInfo.missed) {\n                        console.log(\"debug: coord already registered as missed\");\n                        continue;\n                    }\n                    if (coordInfo.ship) {\n                        if (coordInfo.ship.hits[coordInfo.position].hit) {\n                            console.log(\"debug: coord already registered as hit\");\n                            continue;\n                        }\n                    }\n                }\n                this.sendAttack(gameboard, y, x);\n                console.log(`debug: Computer attacked ${y},${x}`);\n\n                attackSuccessful = true;\n            }\n        },\n        gameBoard: (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n        resetBoard: function() {\n            this.gameBoard = GameBoard();\n        },\n        generateShips: function() {\n            let carrierPlaced = false;\n            while (carrierPlaced === false) {\n                const {y, x} = generateRandomCoords(this.gameBoard);\n                const isVertical = Math.floor(Math.random() * 2);\n                carrierPlaced = this.gameBoard.placeShip((0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(5), y, x, isVertical);\n            }\n\n            let battleshipPlaced = false;\n            while (battleshipPlaced === false) {\n                const {y, x} = generateRandomCoords(this.gameBoard);\n                const isVertical = Math.floor(Math.random() * 2);\n                battleshipPlaced = this.gameBoard.placeShip((0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(4), y, x, isVertical);\n            }\n\n            let destroyerPlaced = false;\n            while (destroyerPlaced === false) {\n                const {y, x} = generateRandomCoords(this.gameBoard);\n                const isVertical = Math.floor(Math.random() * 2);\n                destroyerPlaced = this.gameBoard.placeShip((0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(3), y, x, isVertical);\n            }\n\n            let submarinePlaced = false;\n            while (submarinePlaced === false) {\n                const {y, x} = generateRandomCoords(this.gameBoard);\n                const isVertical = Math.floor(Math.random() * 2);\n                submarinePlaced = this.gameBoard.placeShip((0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(3), y, x, isVertical);\n            }\n\n            let patrolBoatPlaced = false;\n            while (patrolBoatPlaced === false) {\n                const {y, x} = generateRandomCoords(this.gameBoard);\n                const isVertical = Math.floor(Math.random() * 2);\n                patrolBoatPlaced = this.gameBoard.placeShip((0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(2), y, x, isVertical);\n            }\n        },\n    }\n}\n\nfunction addDragDropListeners(player = null) {\n    let currentDragElement;\n    const shipContainer = document.querySelector('.ships');\n    const shipElements = [...shipContainer.children];\n    const cells = document.querySelectorAll('.player .grid-column');\n\n\n    shipElements.forEach((element) => {\n        element.addEventListener('dragstart', e => {\n            currentDragElement = e.target;\n        });\n    })\n\n    cells.forEach(cell => {\n        cell.addEventListener('dragover', (e) => {\n        \n            e.preventDefault();\n        });\n        \n        cell.addEventListener('drop', (e) => {\n            if (currentDragElement === undefined) return;\n            const [y, x] = e.target.getAttribute('data-coordinates').split(',');\n            const length = +currentDragElement.getAttribute('data-length');\n            const isVertical = (currentDragElement.getAttribute('data-vertical') === \"true\") ? true : false;\n\n            const ship = (0,_Ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(length);\n\n            const shipPlaced = player.gameBoard.placeShip(ship, +y, +x, isVertical);\n\n            if (shipPlaced) {\n                _dom_renderer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGameBoard(player.gameBoard, 'player', document.querySelector('.player'));\n                removeShips(shipContainer, currentDragElement);\n                addDragDropListeners(player);\n                currentDragElement = null;\n            }\n        });\n    })\n}\n\nfunction removeShips(shipContainer, shipToRemove) {\n    const shipType = shipToRemove.dataset.shiptype\n    const ships = [...shipContainer.querySelectorAll(`[data-shiptype=\"${shipType}\"]`)];\n    \n    ships.forEach(ship => {\n        shipContainer.removeChild(ship);\n    });\n}\n\nfunction generateShipyard() {\n    const shipyard = document.querySelector('.ships');\n\n    shipyard.innerHTML = '';\n    \n    shipyard.innerHTML += `<div data-shipType=\"carrier\" draggable=\"true\" data-length=\"5\" data-vertical=\"true\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n\n    shipyard.innerHTML += `<div data-shipType=\"carrier\" draggable=\"true\" data-length=\"5\" data-vertical=\"false\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n\n    shipyard.innerHTML += `<div data-shipType=\"battleship\" draggable=\"true\" data-length=\"4\" data-vertical=\"true\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n\n    shipyard.innerHTML += `<div data-shipType=\"battleship\" draggable=\"true\" data-length=\"4\" data-vertical=\"false\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n    \n    shipyard.innerHTML += `<div data-shipType=\"destroyer\" draggable=\"true\" data-length=\"3\" data-vertical=\"true\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n                \n\n    shipyard.innerHTML += `<div data-shipType=\"destroyer\" draggable=\"true\" data-length=\"3\" data-vertical=\"false\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n                \n    shipyard.innerHTML += `<div data-shipType=\"submarine\" draggable=\"true\" data-length=\"3\" data-vertical=\"true\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n                \n    shipyard.innerHTML += `<div data-shipType=\"submarine\" draggable=\"true\" data-length=\"3\" data-vertical=\"false\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n\n    shipyard.innerHTML += `<div data-shipType=\"patrolBoat\" draggable=\"true\" data-length=\"2\" data-vertical=\"true\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n\n    shipyard.innerHTML += `<div data-shipType=\"patrolBoat\" draggable=\"true\" data-length=\"2\" data-vertical=\"false\">\n        <div class=\"ship\"></div>\n        <div class=\"ship\"></div>\n    </div>`;\n}\n\n//# sourceURL=webpack://odin-battleship/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;