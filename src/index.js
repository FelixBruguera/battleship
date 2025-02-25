import Player from "./player";
import Computer from "./computer";
import Gameboard from "./gameboard";
import Ship from "./ship";
import GameboardUI from "./gameboardUI";
import "./index.css"

let player1 = new Player(new Gameboard())
let player2 = new Computer(new Gameboard(), player1.gameboard)
let userGameboard = new GameboardUI(player1)
let computerGameboard = new GameboardUI(player2)

function setDefaults(player) {
    player.gameboard.place(new Ship("Carrier"), 21, 61)
    player.gameboard.place(new Ship("Battleship"), 73, 76)
    player.gameboard.place(new Ship("Destroyer"), 59, 79)
    player.gameboard.place(new Ship("Submarine"),27, 47)
    player.gameboard.place(new Ship("Patrol Boat"),14, 15)
}
setDefaults(player1)
setDefaults(player2)

function handleResult(result, player) {
    if (player == "user") {
        if (result == 'Miss') { setTimeout(() => computerPlays(), 500) }
        else { userPlays() }
        return console.log(result)
    }
    else {
        if (result == 'Miss') { userPlays() }
        else { computerPlays() }
        return console.log(result)
    }

}
function userPlays() {
    computerGameboard.board.addEventListener("click", (e) => {
        let coordinate = e.target.dataset['computerCoordinate']
        if (coordinate == undefined) { 
            alert("Invalid play, try again")
            return userPlays()
         }
        coordinate = parseInt(coordinate)
        let result = player2.gameboard.receiveAttack(coordinate)
        computerGameboard.refreshBoard()
        if (player2.gameboard.allSunk()) { return gameOver("You")}
        handleResult(result, "user")
    }, {once: true})
}
function computerPlays() {
    let coordinate = player2.play()
    let result = player1.gameboard.receiveAttack(coordinate)
    userGameboard.refreshBoard()
    if (player1.gameboard.allSunk()) { return gameOver("Computer")}
    handleResult(result, "computer")
}

function gameOver(winner) {
    alert(`Game Over, ${winner} won!`)
}

userGameboard.paintPieces()
userPlays()


