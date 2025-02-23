import Ship from "../ship";

let ship = null

beforeEach(() => {
    ship = new Ship("Battleship")
  });
  
it("Increases the hits on the ship", () => {
    ship.hit()
    expect(ship.hits).toBe(1)
})

it("Doesnt sunk the ship without enough hits", () => {
    for (let i = 1; i < 3; i++) {
        ship.hit()
    }
    expect(ship.isSunk()).toBe(false)
})

it("Sunks the ship after enough hits", () => {
    for (let i = 1; i < 5; i++) {
        ship.hit()
    }
    expect(ship.isSunk()).toBe(true)
})