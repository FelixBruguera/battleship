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
        this.board.querySelectorAll(".piece-selection").forEach((box) => box.classList.remove("piece-selection"))
        boxes.forEach((box) => {
            box = this.board.querySelector(`[data-${this.type}-coordinate = '${box}']`)
            box.classList.add(name)
        })
    }
    updateBox(coordinate, result) {
        const box = this.board.querySelector(`[data-${this.type}-coordinate = '${coordinate}']`)
        if (result == 'Miss') { this.miss(box) }
        else { this.hit(box) }
    }
    hit(box) {
        box.classList.add("hit")
    }
    miss(box) {
        box.classList.add("miss")
    }
    clearBoard() {
        this.board.querySelectorAll(".box").forEach((box) => box.className = "box")
    }
    colorPieces() {
        this.colorBoxes(this.gameboard.pieces.at(-1).coordinates, "piece")
    }
}