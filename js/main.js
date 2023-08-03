'use strict'

const MINE = '💣'
const FLAG = '🚩'


var gBoard
var gIsFirstTurn
var gIsFirstCell
var gLives
var gTimerIntervalId
var gStartTime

var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gGame.isOn = true

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    // console.log(gBoard)

    gLives = 3
    resetLives()
    gIsFirstTurn = true
}

function buildBoard() {
    var size = gLevel.size
    var board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    // board[2][2].isMine = true
    return board
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) {
                minesCount++
            }

        }
    }
    board[rowIdx][colIdx].minesAroundCount = minesCount
}

function onCellClicked(elCell, rowIdx, colIdx) {
    if (!gGame.isOn) return
    if (gBoard.isShown) return

    var currCell = gBoard[rowIdx][colIdx]
    // console.log(elCell)
    // if (currCell.isShown) return
    currCell.isShown = true

    const elBtn = elCell.querySelector('.hide')
    elBtn.classList.remove("hide")

    updateLives(currCell)
    if (gIsFirstTurn) {
        startTimer()
        gIsFirstCell = { rowIdx, colIdx }
        setMines()
        // renderBoard(gBoard, '.board-container')

    }
}

function setMines() {
    for (var i = 0; i < gLevel.mines; i++) {
        var randCell = getEmptyCell(gBoard)
        gBoard[randCell.i][randCell.j].isMine = true
    }
    renderBoard(gBoard, '.board-container')

    console.log(gBoard)
    gIsFirstTurn = false
}

function resetLives() {
    var strHTML = `${gLives} LIVES LEFT`

    const elLives = document.querySelector('.lives')
    elLives.innerHTML = strHTML
}

function updateLives(cell) {
    if (cell.isMine) {
        gLives--
        var strHTML = `${gLives} LIVES LEFT`

        const elLives = document.querySelector('.lives')
        elLives.innerHTML = strHTML
    }
    if (gLives === 0) gameOver(false)
}

function setLevel(sizeNum, minesNum) {
    gLevel.size = +sizeNum
    gLevel.mines = +minesNum
    resetGame()
}

function resetGame() {
    gLives = 3
    resetLives()
    hidEndScreen()

    clearInterval(gTimerIntervalId)

    const elTimer = document.querySelector('.timer span')
    elTimer.innerText = '0'

    onInit()
}

function gameOver(isVictorious) {
    gGame.isOn = false

    var strHTML = ''
    const elH1 = document.querySelector('h1')
    const elRestart = document.querySelector("button.end-game")
    if (isVictorious) {
        strHTML = `Game Over <span class="win">You Won!</span>`
        elRestart.innerText = '😎'
    } else {
        strHTML = `Game Over <span class="lose">You Lose!</span>`
        elRestart.innerText = '🤯'
    }
    elH1.innerHTML = strHTML

    clearInterval(gTimerIntervalId)
    showEndScreen()
}

function showEndScreen() {
    document.querySelector("h1.end-game").hidden = false
}

function hidEndScreen() {
    document.querySelector("h1.end-game").hidden = true
    const elRestart = document.querySelector("button.end-game")
    elRestart.innerText = '😀'
}


function onCellMarked(elCell, rowIdx, colIdx) {
    if (!gGame.isOn) return

    var selector = `.cell-${rowIdx}-${colIdx} span`
    const elBtn = elCell.querySelector(selector)

    var currCell = gBoard[rowIdx][colIdx]
    if (!currCell.isMarked) {
        currCell.isMarked = true
        gGame.markedCount++
        elBtn.classList.toggle("hide")
        elBtn.innerText = FLAG
    } else {
        currCell.isMarked = false
        gGame.markedCount--
        elBtn.classList.toggle("hide")
        console.log(elCell)
        renderBoard(gBoard, '.board-container')
    }
    console.log(gBoard)
}

function startTimer() {
    gStartTime = Date.now()

    gTimerIntervalId = setInterval(function () {
        var delta = Date.now() - gStartTime
        var elTimer = document.querySelector('.timer span')
        elTimer.innerText = `${Math.floor((delta / 1000))}`
    })
}