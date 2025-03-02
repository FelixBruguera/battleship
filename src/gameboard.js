export default class Gameboard {
    constructor() {
        this.pieces = []
        this.hits = []
        this.misses = []
        this.availableBoxes = this.createAvailableBoxes()
        this.board_size = 10
    }
    createAvailableBoxes() {
        let availableBoxes = []
        for (let row = 1; row <= 10; row++) {
            for (let col = 1; col <= 10; col++) {
                availableBoxes.push(`${col}_${row}`)
            }
        }
        return availableBoxes
    }
    place(ship, startPosition, endPosition) {
        let coordinates = this.createCoords(startPosition, endPosition, ship.length)
        if (coordinates) { 
            this.removeCoordinates(coordinates)
            return this.pieces.push({piece: ship, coordinates: coordinates}) }
        else { return console.log("Invalid position") }
    }
    removeCoordinates(coordinates) {
        this.availableBoxes = this.availableBoxes.filter((box) => !coordinates.includes(box))
    }
    validPlay(playCoords) {
        const col = this.getColumn(playCoords)
        const row = this.getRow(playCoords)
        return (
            col >= 1 && col <= this.board_size &&
            row >= 1 && row <= this.board_size &&
            !this.hits.includes(playCoords) &&
            !this.misses.includes(playCoords)
        )
    }
    getColumn(coordinates) {
        return parseInt(coordinates.split("_")[0])
    }
    getRow(coordinates) {
        return parseInt(coordinates.split("_")[1])
    }
    posiblePositions(ship, startPosition) {
        const col = this.getColumn(startPosition)
        const row = this.getRow(startPosition)
        const shipLength = ship.length - 1
        let positions = [`${col}_${row+shipLength}`, `${col}_${row-shipLength}`, `${col+shipLength}_${row}`,
        `${col-shipLength}_${row}`]
        positions = positions.filter((pos) => this.validPlay(pos))
        positions = positions.map((endPosition) => this.createCoords(startPosition, endPosition, ship.length))
        positions = positions.filter((pos) => pos != false)
        return positions.map((pos) => pos.at(-1))

    }
    createCoords(startPosition, endPosition, shipSize) {
        let coordinates = []
        const startCol = this.getColumn(startPosition)
        const startRow = this.getRow(startPosition)
        const endCol = this.getColumn(endPosition)
        const endRow = this.getRow(endPosition)
        if (startCol == endCol) { this.addVerticalCoords(coordinates, startCol, startRow,endRow, shipSize) }
        else { this.addHorizontalCoords(coordinates, startCol, endCol,startRow, shipSize) }
        if (coordinates.every((coord) => this.availableBoxes.includes(coord))) { return coordinates }
        else { return false }
    }
    addVerticalCoords(coordinates, col, startRow, endRow, shipSize) {
        const step = startRow < endRow ? 1 : -1;
        for (let i = 0; i < shipSize; i++) {
            coordinates.push(`${col}_${startRow + (i * step)}`);
        }
    }

    addHorizontalCoords(coordinates, startCol, endCol, row, shipSize) {
        const step = startCol < endCol ? 1 : -1;
        for (let i = 0; i < shipSize; i++) {
            coordinates.push(`${startCol + (i * step)}_${row}`);
        }
    }
    receiveAttack(playCoords) {
        if (this.validPlay(playCoords) == false) { return "Invalid play, try again"}
        let result = this.pieces.find((piece) => piece.coordinates.includes(playCoords))
        if (result == undefined) {
            this.misses.push(playCoords)
            return "Miss"
        }
        else {
            result.piece.hit()
            this.hits.push(playCoords)
            if (result.piece.isSunk()) { return `Hit! ${result.piece.name} sunk` }
            return "Hit!"
        }
    }
    allSunk() {
        return this.pieces.every((piece) => piece.piece.isSunk())
    }
}