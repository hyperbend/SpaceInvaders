'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

// represent the aliens area in the matrix
var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = true

var gAlienDirection = 1 // 1 = ימינה, -1 = שמאלה


function createAliens(board) {
    var startCol = 3

    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2

    for (var i = 0; i < 3; i++) {
        for (var j = startCol; j < startCol + 8; j++) {
            board[i][j].gameObject = ALIEN
            gGame.alienCount++
        }
    }
}

function handleAlienHit(pos) {
    updateCell(pos, null)
    gGame.alienCount--

    updateScore(10)

    // אם כל החייזרים מתו – ניצחון
    if (gGame.alienCount === 0) {
        gGame.isOn = false
        alert('You Win!')
    }
}


function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 2; j >= 0; j--) {
            var cell = board[i][j]
            if (cell.gameObject === ALIEN) {
                // מזיז את החייזר ימינה
                board[i][j + 1].gameObject = ALIEN
                cell.gameObject = null
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 1; j < board[i].length; j++) {
            var cell = board[i][j]
            if (cell.gameObject === ALIEN) {
                board[i][j - 1].gameObject = ALIEN
                cell.gameObject = null
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (toI + 1 >= BOARD_SIZE) return

    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = board[i][j]
            if (cell.gameObject === ALIEN) {
                board[i + 1][j].gameObject = ALIEN
                cell.gameObject = null
            }
        }
    }

    gAliensTopRowIdx++
    gAliensBottomRowIdx++
}



// runs the interval for moving aliens side to side and down
function moveAliens() {
    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return

        var reachedEdge = false

        // בדיקת קצה ימין או שמאל
        for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
            for (var j = 0; j < BOARD_SIZE; j++) {
                var cell = gBoard[i][j]
                if (cell.gameObject === ALIEN) {
                    if (gAlienDirection === 1 && j === BOARD_SIZE - 1) {
                        reachedEdge = true
                    }
                    if (gAlienDirection === -1 && j === 0) {
                        reachedEdge = true
                    }
                }
            }
        }

        // אם הגענו לקצה – ירידה והחלפת כיוון
        if (reachedEdge) {
            if (gAliensBottomRowIdx + 1 >= BOARD_SIZE) {
                clearInterval(gIntervalAliens)
                gGame.isOn = false
                alert('Game Over!')
                return
            }

            shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            gAlienDirection *= -1
        } else {
            // תזוזה ימינה או שמאלה
            if (gAlienDirection === 1) {
                shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            } else {
                shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
        }

        renderBoard(gBoard)

    }, ALIEN_SPEED)
}

