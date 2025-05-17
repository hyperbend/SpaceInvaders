'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

// represent the aliens area in the matrix
var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = true

function createAliens(board) {
    var startCol = 3 // העמודה שממנה נתחיל למקם חייזרים

    for (var i = 0; i < 3; i++) { // 3 שורות למעלה
        for (var j = startCol; j < startCol + 8; j++) { // 8 תאים בכל שורה
            board[i][j].gameObject = ALIEN
            gGame.alienCount++
        }
    }
}
function handleAlienHit(pos) { }

function shiftBoardRight(board, fromI, toI) { }
function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }

// runs the interval for moving aliens side to side and down
function moveAliens() { }
