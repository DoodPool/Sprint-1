'use strict'

const MINE = '💣'
const FLAG = '🚩'

var gBoard
var gIsFirstTurn
var gIsFirstCell
var gLives 
var gStartTime

var gLevel = {
    size: 4,
    mines: 2,
    lives: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gGame.isOn = true
    gGame.markedCount = 0

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')

    resetLives()
    gIsFirstTurn = true
    gGame.secsPassed = 0
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
    currCell.isShown = true

    const elBtn = elCell.querySelector('.hide')
    elBtn.classList.remove("hide")

    updateLives(currCell)
    if (gIsFirstTurn) {
        gStartTime = setInterval(() => startTimer(), 1000)
        gIsFirstCell = { rowIdx, colIdx }
        setMines()
        gGame.shownCount++
    }
    gGame.shownCount++
    gameOver()
}

function setMines() {
    for (var i = 0; i < gLevel.mines; i++) {
        var randCell = getEmptyCell(gBoard)
        gBoard[randCell.i][randCell.j].isMine = true
    }
    renderBoard(gBoard, '.board-container')

    gIsFirstTurn = false
}

function resetLives() {
    var strHTML = `${gLevel.lives} LIVES LEFT`

    const elLives = document.querySelector('.lives')
    elLives.innerHTML = strHTML
}

function updateLives(cell) {
    if (cell.isMine) {
        gLevel.lives--
        var strHTML = `${gLevel.lives} LIVES LEFT`

        const elLives = document.querySelector('.lives')
        elLives.innerHTML = strHTML
    }
    if (gLevel.lives === 0) gameOver()
}

function setLevel(sizeNum, minesNum, livesNum) {
    gLevel.size = +sizeNum
    gLevel.mines = +minesNum
    gLevel.lives = +livesNum

    gLives = +livesNum

    resetGame()
}

function resetGame() {
    gLevel.lives = gLives
    gGame.shownCount = 0

    resetLives()
    hidEndScreen()

    clearInterval(gStartTime)

    const elTimer = document.querySelector('.timer span')
    elTimer.innerText = '0'

    const elFlags = document.querySelector('.flag span')
    elFlags.innerText = '0'

    onInit()
}

function gameOver() {
    var strHTML = ''
    const elH1 = document.querySelector('h1')
    const elRestart = document.querySelector("button.end-game")
    var isVictorious
    if (gLevel.lives === 0) {
        isVictorious = false
    } else if (gLevel.mines === gGame.markedCount && gGame.shownCount === gLevel.size ** 2) {
        isVictorious = true
    } else {
        return
    }

    if (isVictorious) {
        strHTML = `Game Over <span class="win">You Won!</span>`
        elRestart.innerText = '😎'
        gGame.isOn = false
    } else {
        strHTML = `Game Over <span class="lose">You Lose!</span>`
        elRestart.innerText = '🤯'
        gGame.isOn = false
    }
    elH1.innerHTML = strHTML

    clearInterval(gStartTime)
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
    if (gIsFirstTurn) return
    if (!gGame.isOn) return
    var currCell = gBoard[rowIdx][colIdx]
    if (currCell.isShown) return

    var selector = `.cell-${rowIdx}-${colIdx} span`
    const elBtn = elCell.querySelector(selector)

    if (!currCell.isMarked) {
        currCell.isMarked = true
        gGame.markedCount++
        elBtn.classList.toggle("hide")
        elBtn.innerText = FLAG
    } else {
        currCell.isMarked = false
        gGame.markedCount--
        elBtn.classList.toggle("hide")
        if (currCell.isMine) {
            elBtn.innerText = MINE
        } else {
            elBtn.innerText = currCell.minesAroundCount
        }
    }
    var elFlag = document.querySelector('.flag span')
    elFlag.innerText = `${gGame.markedCount}`
}

function startTimer() {
    gGame.secsPassed++

    var elTimer = document.querySelector('.timer span')
    elTimer.innerText = `${gGame.secsPassed}`
}
