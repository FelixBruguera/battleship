export default class GameboardUI {
    constructor(player) {
        this.gameboard = player.gameboard
        this.type = player.type
        this.board = this.setBoard()
        this.renderBoard(this.board)
    }
    setBoard() {
        if (this.type == 'user') {return document.querySelector("#user-board")}
        else {return document.querySelector("#computer-board")}
    }
    renderBoard(board) {
        for (let i = 1; i <= 100; i++) {
            let box = document.createElement("div")
            box.setAttribute(`data-${this.type}-coordinate`, i)
            box.classList.add("box")
            box.textContent = i
            board.appendChild(box)
        }
    }
    paintHits() {
        this.gameboard.hits.forEach((hit) => {
            let box = this.board.querySelector(`[data-${this.type}-coordinate = '${hit}']`)
            box.classList.add("hit")
        })
    }
    paintMisses() {
        this.gameboard.misses.forEach((miss) => {
            let box = this.board.querySelector(`[data-${this.type}-coordinate = '${miss}']`)
            box.classList.add("miss")
        })
    }
    refreshBoard() {
        this.paintHits()
        this.paintMisses()
    }
    paintPieces() {
        this.gameboard.pieces.forEach((piece) => {
            piece.coordinates.forEach((coordinate) => {
                let box = document.querySelector(`div[data-${this.type}-coordinate="${coordinate}"]`)
                box.classList.add("piece")
            })
        })
    }
}