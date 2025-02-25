import Computer from "../computer";
import Gameboard from "../gameboard";

let opponentBoard
let computer

beforeEach(() => {
    opponentBoard = new Gameboard()
    computer = new Computer(new Gameboard(), opponentBoard) 
  });

  describe("When the board has many misses", () => {
    it ("Returns a valid play", () => {
        for (let i = 1; i < 90; i++) {
            opponentBoard.receiveAttack(i)
        }
        expect(computer.play()).toBeGreaterThanOrEqual(90)
    })
  })