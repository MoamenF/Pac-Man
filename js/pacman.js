'use strict'

const PACMAN = '😷';

const PacManUP_IMG = '<img class="cell-img" src="img/pacmanUp.png">'
const PacManDOWN_IMG = '<img class="cell-img" src="img/pacmanDown.png">'
const PacManLEFT_IMG = '<img class="cell-img" src="img/pacmanLeft.png">'
const PacManRIGHT_IMG = '<img class="cell-img" src="img/pacmanRight.png">'

var gPacman;
var gVanishedGhosts = []
var gIsSuperTimeOut
var gPacmanDirection = PacManLEFT_IMG
var gPacmanMouthInterval


function createPacman(board) {
    gPacman = {
        location: {
            i: 10,
            j: 7
        },
        isSuper: false,
        currCellContent: EMPTY
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCount--
}

function movePacman(ev) {
    if (!gGame.isOn) return

    var direction = typeof ev === 'string' ? ev : ev.code

    var nextLocation = getNextLocation(direction)

    if (!nextLocation) return

    if (gBgAudio.paused) gBgAudio.play()
    if (!gGhostsInterval) {
        gGhostsInterval = setInterval(moveGhosts, 1000)
    }
    var elStartMsg = document.querySelector('.start-msg').hidden = true

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) {
            gPacman.currCellContent = SUPERFOOD
            
        } else {
            gPacman.isSuper = true
            renderGhosts() //after SR
            gIsSuperTimeOut = setTimeout(() => {
                gPacman.isSuper = false
                respawnGhosts()
                renderGhosts() //after SR
            }, 5000);

        }

    } else if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--
        console.log('gFoodCount:', gFoodCount)
        checkVictory()
        // console.log('gFoodCount:', gFoodCount)

    } else if (nextCell === CHERRY) {
        updateScore(10)

    } else if ((nextCell === redGHOST || nextCell === pinkGHOST || nextCell === blueGHOST)) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                const vanishedGhost = gGhosts.splice(i, 1)[0]
                checkGhostCellContent(vanishedGhost) //after SR
                gVanishedGhosts.push(vanishedGhost)

                // const ghost = gGhosts[i]
                // gVanishedGhosts.push(gGhosts.splice(i, 1)[0])
            }  

        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    if (gPacman.isSuper && (gPacman.location.i === 1 && gPacman.location.j === 1 ||
        gPacman.location.i === 1 && gPacman.location.j === 10 ||
        gPacman.location.i === 10 && gPacman.location.j === 1 ||
        gPacman.location.i === 10 && gPacman.location.j === 10)) {
        renderCell(gPacman.location, gPacman.currCellContent)
        gPacman.currCellContent = EMPTY
    } else renderCell(gPacman.location, EMPTY)

    // update the model
    if (nextLocation.i === 6 && nextLocation.j < 0) nextLocation = { i: 6, j: 11 }
    else if (nextLocation.i === 6 && nextLocation.j > 11) nextLocation = { i: 6, j: 0 }

    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, gPacmanDirection)
}

function getNextLocation(direction) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (direction) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacmanDirection = PacManUP_IMG
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacmanDirection = PacManDOWN_IMG
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacmanDirection = PacManLEFT_IMG
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacmanDirection = PacManRIGHT_IMG
            break;
        default:
            return null;
    }
    return nextLocation;
}




// function pacmanMouth() {
//     var isOpen = true

//     gPacmanMouthInterval = setInterval (() => {
//         isOpen = !isOpen

        

//     }, 200)
// }