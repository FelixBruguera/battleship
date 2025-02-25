import pieceTypes from "./pieceTypes.json" with {type: 'json'}

export default class Ship {
    constructor(name) {
        this.name = name
        this.length = pieceTypes[this.name]
        this.sunk = false
        this.hits = 0
    }
    hit() {
       this.hits++ 
    }
    isSunk() {
        return this.hits >= this.length
    }

}