'use strict'

const BOARD_SIZE = 14 // 14 x 14
const ALIEN_ROW_LENGTH = 8 // 8 חייזרים בכל שורה
const ALIEN_ROW_COUNT = 3 // ב־3 שורות עליונות

const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard

var gGame = {
    isOn: false,
    alienCount: 0
}

// Called when game loads
function init() {
    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    var board = []

    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []                            // יוצרים שורה חדשה בלוח
        for (var j = 0; j < BOARD_SIZE; j++) {   // לולאה פנימית שעוברת על העמודות 
            board[i][j] = {
                type: 'SKY',
                gameObject: null
            }
        }
    }

    return board
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '<tbody>'

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            const gameObject = board[i][j].gameObject || ''
            strHTML += `<td data-i="${i}" data-j="${j}">${gameObject}</td>` // יוצר תא בטבלה עם התוכן ומיקומו בלוח

        }
        strHTML += '</tr>'
    }

    strHTML += '</tbody>'
    document.querySelector('.board').innerHTML = strHTML
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}
