import Gameboard from "../gameboard";
import Ship from "../ship";

let gameboard

beforeEach(() => {
    gameboard = new Gameboard("Player", Ship)
  });

describe("Places a ship correctly", () => {
    it("When the coordinates are vertical", () => {
        gameboard.place(new Ship("Battleship"), 1, 4)
        let piece = gameboard.pieces[0]
        expect(piece.coordinates).toContain(1)
        expect(piece.coordinates).toContain(2)
        expect(piece.coordinates).toContain(3)
        expect(piece.coordinates).toContain(4)
    })
    it("When the coordinates are horizontal", () => {
        gameboard.place(new Ship("Battleship"), 1, 31)
        let piece = gameboard.pieces[0]
        expect(piece.coordinates).toContain(1)
        expect(piece.coordinates).toContain(11)
        expect(piece.coordinates).toContain(21)
        expect(piece.coordinates).toContain(31)
    })
})

describe("Attack resulting in a miss", () => {
    let functionCall
    beforeEach(() => {
        functionCall = gameboard.receiveAttack(5)
      });
    it("Returns 'Miss'", () => {
        expect(functionCall).toBe("Miss")
    })
    it("Saves the coordinates of the miss", () => {
        expect(gameboard.misses).toContain(5)
    })
})

describe("Attack resulting in a hit", () => {
    let functionCall
    beforeEach(() => {
        gameboard.place(new Ship("Battleship"), 1, 4)
        functionCall = gameboard.receiveAttack(3)
      });
    it("Returns 'Hit'", () => {
        expect(functionCall).toBe("Hit")
    })
    it("Saves the coordinates of the hit", () => {
        expect(gameboard.hits).toContain(3)
    })
    it("Calls hit() on the hitted piece", () => {
        expect(gameboard.pieces[0].piece.hits).toBe(1)
    })
})

describe("When all ships are sunk", () => {
    beforeEach(() => {
        gameboard.place(new Ship("Destroyer"), 1, 3)
        for (let i = 1; i < 4; i++) {
            gameboard.receiveAttack(i)
        }
      });
    
    it("Returns true", () => {
        expect(gameboard.allSunk()).toBe(true)
    })
})