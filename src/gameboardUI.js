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
        for (let row = 1; row <= 10; row++) {
            for (let col = 1; col <= 10; col++) {
                let box = document.createElement("div")
                box.setAttribute(`data-${this.type}-coordinate`, `${col}_${row}`)
                box.classList.add("box")
                board.appendChild(box)
            }
        }
    }
    colorBoxes(boxes, name) {
        boxes.forEach((box) => {
            box = this.board.querySelector(`[data-${this.type}-coordinate = '${box}']`)
            box.classList.add(name)
        })
    }
    refreshBoard() {
        this.colorBoxes(this.gameboard.hits, "hit")
        this.colorBoxes(this.gameboard.misses, "miss")
    }
    clearBoard() {
        this.board.querySelectorAll(".box").forEach((box) => box.className = "box")
    }
    colorPieces() {
        this.clearBoard()
        this.gameboard.pieces.forEach((piece) => this.colorBoxes(piece.coordinates, "piece"))
    }
}