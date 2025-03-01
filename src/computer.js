export default class Computer {
    constructor(gameboard, opponentBoard) {
        this.type = "computer"
        this.gameboard = gameboard
        this.opponentBoard = opponentBoard
        this.availablePlays = this.gameboard.createAvailableBoxes()
    }
    getRandomElement(options) {
        return options.at(Math.floor(Math.random()*options.length))
    }
    placeShip(ship) {
        let availableBoxes = this.gameboard.availableBoxes
        let startPosition = this.getRandomElement(availableBoxes)
        let options = this.gameboard.posiblePositions(ship, startPosition)
        let endPosition =  this.getRandomElement(options)
        return this.gameboard.place(ship, startPosition, endPosition)
    }
    getAdjacentCoordinates() {
        let lastHit = this.opponentBoard.hits.at(-1)
        let row = this.gameboard.getRow(lastHit)
        let col = this.gameboard.getColumn(lastHit)
        // These are the coordinates above, below, right and left of the last hit
        return [`${col}_${row-1}`, `${col}_${row+1}`, `${col+1}_${row}`, `${col-1}_${row}`]
    }
    removeCoordinate(coordinate) {
        this.availablePlays = this.availablePlays.filter((coord) => coord != coordinate)
    }
    adjacentPlay(options) {
        const validOptions = options.filter((play) => this.opponentBoard.validPlay(play))
        if (validOptions.length > 0) { return this.getRandomElement(validOptions) }
        return false
    }
    play() {
        if (this.opponentBoard.hits.length > 0) {
            let selection = this.adjacentPlay(this.getAdjacentCoordinates())
            if (selection) {
                this.removeCoordinate(selection)
                return selection 
            }
        }
        let randomPlay = this.getRandomElement(this.availablePlays)
        this.removeCoordinate(randomPlay)
        return randomPlay
    }
}