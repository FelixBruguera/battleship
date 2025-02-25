export default class Computer {
    constructor(gameboard, opponentBoard) {
        this.type = "computer"
        this.gameboard = gameboard
        this.opponentBoard = opponentBoard
        this.availablePlays = [...new Array(101).keys()]
        this.availablePlays.shift()
    }
    randomPlay() {
        return this.availablePlays.at(Math.floor(Math.random()*this.availablePlays.length))
    }
    verticalHit() {
        let higher = this.opponentBoard.hits.at(-1)-10
        let lower = this.opponentBoard.hits.at(-1)+10
        if (this.opponentBoard.validPlay(higher)) { return higher}
        if (this.opponentBoard.validPlay(lower)) { return lower}
        return false
    }
    horizontalHit() {
        let right = this.opponentBoard.hits.at(-1)+1
        let left = this.opponentBoard.hits.at(-1)-1
        if (this.opponentBoard.validPlay(right)) { return right}
        if (this.opponentBoard.validPlay(left)) { return left}
        return false
    }
    play() {
        let verticalHit = this.verticalHit()
        if (verticalHit) {
            let index = this.availablePlays.indexOf(verticalHit)
            this.availablePlays.splice(index, 1)
            return verticalHit }
        let horizontalHit = this.horizontalHit()
        if (horizontalHit) { 
            let index = this.availablePlays.indexOf(horizontalHit)
            this.availablePlays.splice(index, 1)
            return horizontalHit }
        let random = this.randomPlay()
        let index = this.availablePlays.indexOf(random)
        this.availablePlays.splice(index, 1)
        return random
    }
}