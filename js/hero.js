'use strict'

const LASER_SPEED = 80

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false
}

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}

// Handle game keys
function onKeyDown(ev) {
    if (!gGame.isOn) return

    switch (ev.code) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1)
            break
        case 'Space':
            shoot()
            break
    }
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    var i = gHero.pos.i
    var j = gHero.pos.j
    var nextJ = j + dir

    // לא לזוז מחוץ לגבולות הלוח
    if (nextJ < 0 || nextJ >= BOARD_SIZE) return

    // מחיקה מהמיקום הנוכחי
    updateCell({ i: i, j: j }, null)

    // עדכון מיקום
    gHero.pos.j = nextJ

    // הצבה במיקום החדש
    updateCell({ i: i, j: nextJ }, HERO)
}

// Sets an interval for shooting the laser up towards aliens
function shoot() {
    if (gHero.isShoot) return
    gHero.isShoot = true

    var laserPos = { i: gHero.pos.i, j: gHero.pos.j }
    var prevPos = null

    var laserInterval = setInterval(function () {
        // מוחקים לייזר קודם
        if (prevPos) updateCell(prevPos, null)

        laserPos.i--

        if (laserPos.i < 0) {
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
        }

        var cell = gBoard[laserPos.i][laserPos.j]

        if (cell.gameObject === ALIEN) {
            updateCell(laserPos, null)
            handleAlienHit(laserPos)
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
        }

        blinkLaser(laserPos)
        prevPos = { i: laserPos.i, j: laserPos.j }

    }, LASER_SPEED)
}




// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    updateCell(pos, LASER)

    setTimeout(function () {
        if (gBoard[pos.i][pos.j].gameObject === LASER) {
            updateCell(pos, null)
        }
    }, LASER_SPEED)
}
