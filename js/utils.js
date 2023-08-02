'use strict'

//In Use//

function renderBoard(mat, selector) {

    var strHTML = '<table class="board"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            var cell = mat[i][j]
            // console.log(cell)
            setMinesNegsCount(gBoard, i, j)

            if (cell.isMine) {
                cell = MINE
            } else {
                cell = cell.minesAroundCount
            }

            const className = 'cell-' + i + '-' + j
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"><span class="hide">${cell}</span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//In Use//

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// program to generate random strings

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// console.log(generateString(5));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var count = countFoodAround(gBoard, 0, 0)
// console.log('Found', count, ' food around me')

function countFoodAround(board, rowIdx, colIdx) {
    var foodCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell === FOOD) foodCount++
        }
    }
    return foodCount
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pac-Man Board

function buildBoard() {
    const SIZE = 4
    var board = []

    for (var i = 0; i < SIZE; i++) {
        board[i] = []
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = 1
        }
    }
    // console.log(board)
    return board
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pac-Man Interval

var gAddCherryInterval

// gAddCherryInterval = setInterval(() => addCherry(gBoard), 15000)

// setTimeout(() => { gPacMan.isSuper = false, reviveGhosts() }, 5000)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function playSound() {
    const sound = new Audio('1.mp3')
    sound.play()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//In Use//

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine === false && currCell.isShown === false) emptyCells.push({ i, j })
        }
    }
    var randCell = emptyCells[getRandomInt(0, emptyCells.length - 1)]
    return randCell
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function onHandleKey(event) {
    const i = gGamerPos.i;
    const j = gGamerPos.j;
    switch (event.key) {
        case "ArrowLeft":
        case "a":
            moveTo(i, j - 1);
            break;
        case "ArrowRight":
        case "d":
            moveTo(i, j + 1);
            break;
        case "ArrowUp":
        case "w":
            moveTo(i - 1, j);
            break;
        case "ArrowDown":
        case "s":
            moveTo(i + 1, j);
            break;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////