export default class Gameboard {
    constructor(player) {
        this.player = player
        this.pieces = []
        this.hits = []
        this.misses = []
    }
    place(ship, startPosition, endPosition) {
        this.pieces.push({piece: ship, coordinates: this.createCoords(startPosition, endPosition)})
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
        let result = this.pieces.find((piece) => piece.coordinates.includes(playCoords))
        if (result == undefined) {
            this.misses.push(playCoords)
            return "Miss"
        }
        else {
            result.piece.hit()
            this.hits.push(playCoords)
            return "Hit"
        }
    }
    allSunk() {
        return this.pieces.every((piece) => piece.piece.isSunk())
    }
}