import Gameboard from "../gameboard";
import Ship from "../ship";

let gameboard

beforeEach(() => {
    gameboard = new Gameboard()
  });

describe("Places a ship correctly", () => {
    it("When the coordinates are horizontal", () => {
        gameboard.place(new Ship("Battleship"), "1_1", "4_1")
        let piece = gameboard.pieces[0]
        expect(piece.coordinates).toContain("1_1")
        expect(piece.coordinates).toContain("2_1")
        expect(piece.coordinates).toContain("3_1")
        expect(piece.coordinates).toContain("4_1")
    })
    it("When the coordinates are vertical", () => {
        gameboard.place(new Ship("Battleship"), "1_1", "1_4")
        let piece = gameboard.pieces[0]
        expect(piece.coordinates).toContain("1_1")
        expect(piece.coordinates).toContain("1_2")
        expect(piece.coordinates).toContain("1_3")
        expect(piece.coordinates).toContain("1_4")
    })
})

describe("When a play is repeated", () => {
    it("Returns false", () => {
        gameboard.receiveAttack("5_5")
        expect(gameboard.validPlay("5_5")).toBe(false)
    })
    it("Does not duplicate the play", () => {
        gameboard.receiveAttack("5_5")
        gameboard.receiveAttack("5_5")
        expect(gameboard.misses).toStrictEqual(["5_5"])
    })
})
describe("When a play is out of the board", () => {
    it("Returns false", () => {
        expect(gameboard.validPlay("0_0")).toBe(false)
        expect(gameboard.validPlay("9_15")).toBe(false)
    })
})

describe("Attack resulting in a miss", () => {
    let functionCall
    beforeEach(() => {
        functionCall = gameboard.receiveAttack("5_5")
      });
    it("Returns 'Miss'", () => {
        expect(functionCall).toBe("Miss")
    })
    it("Saves the coordinates of the miss", () => {
        expect(gameboard.misses).toContain("5_5")
    })
})

describe("Attack resulting in a hit", () => {
    let functionCall
    beforeEach(() => {
        gameboard.place(new Ship("Battleship"), "1_1", "1_4")
        functionCall = gameboard.receiveAttack("1_2")
      });
    it("Returns 'Hit!'", () => {
        expect(functionCall).toBe("Hit!")
    })
    it("Saves the coordinates of the hit", () => {
        expect(gameboard.hits).toContain("1_2")
    })
    it("Calls hit() on the hit piece", () => {
        expect(gameboard.pieces[0].piece.hits).toBe(1)
    })
})

describe("When all ships are sunk", () => {
    beforeEach(() => {
        gameboard.place(new Ship("Destroyer"), "1_1", "1_3")
        for (let i = 1; i < 4; i++) {
            gameboard.receiveAttack(`1_${i}`)
        }
      });
    
    it("Returns true", () => {
        expect(gameboard.allSunk()).toBe(true)
    })
})

describe("When posiblePositions is called", () => {
    it("Returns all posible positions", () => {
        let call = gameboard.posiblePositions(new Ship("Carrier"), "5_5")
        expect(call).toContain("5_1")
        expect(call).toContain("9_5")
        expect(call).toContain("1_5")
        expect(call).toContain("5_9")
    })
    it("Doesnt return positions out of the board", () => {
        let call = gameboard.posiblePositions(new Ship("Battleship"), "1_5")
        expect(call.length).toBe(3)
        expect(call).toContain("1_2")
        expect(call).toContain("4_5")
        expect(call).toContain("1_8")
    })
})