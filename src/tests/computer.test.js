import Computer from "../computer";
import Gameboard from "../gameboard";
import Ship from "../ship";

let opponentBoard
let computer

beforeEach(() => {
    opponentBoard = new Gameboard()
    computer = new Computer(new Gameboard(), opponentBoard) 
  });

describe("When the board has only 1 empty box", () => {
  it ("Returns a valid play", () => {
      for (let i = 1; i < 99; i++) {
        let play = computer.play()
        opponentBoard.receiveAttack(play)
      }
      expect(opponentBoard.validPlay(computer.play())).toBe(true)
  })
})

describe("After a hit", () => {
  it("Makes a valid play", () => {
    opponentBoard.place(new Ship("Patrol Boat"), "10_9", "10_10")
    opponentBoard.receiveAttack("10_9")
    expect(computer.play()).not.toContain("NaN")
  })
  it("Makes a play on an adjacent box", () => {
    opponentBoard.place(new Ship("Patrol Boat"), "5_5", "4_5")
    opponentBoard.receiveAttack("5_5")
    let play = computer.play()
    opponentBoard.receiveAttack(play)
    expect(["5_4", "6_5", "5_6", "4_5"]).toContain(play)
  })
})

describe("When placing ship", () => {
  it("Places all ships in valid positions", () => {
    let ships = [new Ship("Carrier"), new Ship("Battleship"), new Ship("Destroyer"), new Ship("Submarine"), new Ship("Patrol Boat")]
      ships.forEach((ship) => computer.placeShip(ship))
      expect(computer.gameboard.pieces.length).toBe(5)
  })
})