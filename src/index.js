import Player from "./player";
import Computer from "./computer";
import Gameboard from "./gameboard";
import Ship from "./ship";
import GameboardUI from "./gameboardUI";
import pieceTypes from "./pieceTypes.json" with {type: 'json'}
import "./index.css"

const SHIP_LIST = Object.keys(pieceTypes)
let user = new Player(new Gameboard())
let computer = new Computer(new Gameboard(), user.gameboard)
let userGameboard = new GameboardUI(user)
let computerGameboard = new GameboardUI(computer)
let playerUI = document.querySelector("#player")
let message = document.querySelector("#message")
let restart = document.querySelector("#restart")
let currentShip = 0

function handleResult(result, player) {
    if (player == "User") {
        if (result == 'Miss') { computerPlays() }
        else { userPlays() }
    }
    else {
        if (result == 'Miss') { userPlays() }
        else { computerPlays() }
    }
    playerUI.textContent = player + ":"
    return message.textContent = " "+ result
}
function getDataAttribute(event, dataAttribute) {
    return event.target.dataset[dataAttribute]
}
function userPlays() {
    computerGameboard.board.addEventListener("click", (e) => {
        let coordinate = getDataAttribute(e, 'computerCoordinate')
        if (coordinate == undefined) { return handleResult("Invalid play, try again", "User") }
        let result = computer.gameboard.receiveAttack(coordinate)
        computerGameboard.updateBox(coordinate, result)
        if (computer.gameboard.allSunk()) { return gameOver("You")}
        handleResult(result, "User")
    }, {once: true})
}
function computerPlays() {
    setTimeout(() => {
        let coordinate = computer.play()
        let result = user.gameboard.receiveAttack(coordinate)
        userGameboard.updateBox(coordinate, result)
        if (user.gameboard.allSunk()) { return gameOver("Computer")}
        handleResult(result, "Computer")
    }, 1000)
}

function gameOver(winner) {
    message.textContent = ''
    restart.className = ''
    restart.addEventListener("click", () => playAgain(), {once: true})
    return playerUI.textContent = `Game Over, ${winner} won!`
}

function placeShip(ship) {
    message.textContent = `Place your ${ship.name}`
    userGameboard.board.addEventListener("click", (e) => {
        let coordinate = getDataAttribute(e, 'userCoordinate')
        if (coordinate == undefined || !userGameboard.gameboard.availableBoxes.includes(coordinate)) { 
            alert("Invalid Selection")
            return placeShip(ship)
        }
        let positions = userGameboard.gameboard.posiblePositions(ship, coordinate)
        userGameboard.colorBoxes([coordinate], "piece")
        userGameboard.colorBoxes(positions, "piece-selection")
        handleSelections(ship, coordinate, positions)
    }, {once: true})
}

function handleSelections(ship, startPosition, positions) {
    userGameboard.board.addEventListener("click", (e) => {
        let coordinate = getDataAttribute(e, 'userCoordinate')
        if (positions.includes(coordinate)) {
            userGameboard.gameboard.place(ship, startPosition, coordinate)
            userGameboard.colorPieces()
            currentShip++
            if (currentShip < 5) { placeShip(new Ship(SHIP_LIST[currentShip]))}
            else {
                message.textContent = "Game started!"
                return userPlays() }
        }
        else {
            alert("Please select a valid box")
            handleSelections(ship, startPosition, positions)
        }
    }, {once: true})
}

function playAgain() {
    message.textContent = ''
    playerUI.textContent = ''
    restart.className = 'hidden'
    currentShip = 0
    user = new Player(new Gameboard())
    computer = new Computer(new Gameboard(), user.gameboard)
    userGameboard = new GameboardUI(user)
    computerGameboard = new GameboardUI(computer)
    SHIP_LIST.forEach((ship) => computer.placeShip(new Ship(ship)))
    userGameboard.clearBoard()
    computerGameboard.clearBoard()
    placeShip(new Ship("Carrier"))
}

SHIP_LIST.forEach((ship) => computer.placeShip(new Ship(ship)))
placeShip(new Ship("Carrier"))


