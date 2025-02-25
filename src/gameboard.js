export default class Gameboard {
    constructor() {
        this.pieces = []
        this.hits = []
        this.misses = []
    }
    place(ship, startPosition, endPosition) {
        this.pieces.push({piece: ship, coordinates: this.createCoords(startPosition, endPosition)})
    }
    validPlay(playCoords) {
        if ((playCoords < 1) | (playCoords > 100)) { return false }
        if (this.hits.includes(playCoords)) { return false }
        if (this.misses.includes(playCoords)) { return false }
        return true
    }
    createCoords(startPosition, endPosition) {
        let coordinates = []
        let step = 1
        if ((endPosition - startPosition) > 4) { step = 10 }
        for (let i = startPosition; i <= endPosition; i = i + step) {
            coordinates.push(i)
        }
        return coordinates
    }
    receiveAttack(playCoords) {
        if (this.validPlay(playCoords) == false) { return "Invalid Play"}
        let result = this.pieces.find((piece) => piece.coordinates.includes(playCoords))
        if (result == undefined) {
            this.misses.push(playCoords)
            return "Miss"
        }
        else {
            result.piece.hit()
            this.hits.push(playCoords)
            if (result.piece.isSunk()) { return `Hit, ${result.piece.name} sunk` }
            return "Hit"
        }
    }
    allSunk() {
        return this.pieces.every((piece) => piece.piece.isSunk())
    }
}