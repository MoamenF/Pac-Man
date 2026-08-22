'use strict'

const redGHOST = '*R'
const pinkGHOST = '*P'
const blueGHOST = '*B'

const RedGHOST_IMG = '<img class="cell-img" src="img/redGhost.png">'
const PinkGHOST_IMG = '<img class="cell-img" src="img/pinkGhost.png">'
const BlueGHOST_IMG = '<img class="cell-img" src="img/blueGhost.png">'

const ScaredGHOST_IMG = '<img class="cell-img" src="img/scaredGhost.png">'

var gGhosts = []
var gIntervalGhosts


function createGhost(board, location, color) {
    const ghost = {
        location: location,
        currCellContent: FOOD,
        color: color
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = color
}


function respawnGhosts() {
    for (var i = gVanishedGhosts.length - 1; i < gVanishedGhosts.length && i >= 0; i--) {
        gGhosts.push(gVanishedGhosts.splice(i, 1)[0])
    }
}


function createGhosts(board) {
    const locations = [
        { i: 5, j: 4 },
        { i: 5, j: 5 },
        { i: 5, j: 6 }
    ]
    const colors = [
        redGHOST,
        pinkGHOST,
        blueGHOST
    ]
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        var location = locations[i]
        var color = colors[i]
        createGhost(board, location, color)
    }

    console.log('gGhosts:', gGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 2000)
}


function moveGhosts() {
    if (!gGame.isOn) return
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        // console.log('ghost:', ghost)
        moveGhost(ghost)
    }
}


function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL || nextLocation.j < 0 || nextLocation.j > gBoard[0].length - 1) return
    if (nextCell === redGHOST || nextCell === pinkGHOST || nextCell === blueGHOST) return
    if (nextCell === PACMAN) {
            if(gPacman.isSuper) {
                for (var i = 0; i < gGhosts.length; i++) {
                    var currLocation = gGhosts[i].location
                    const vanishedGhost = gGhosts.splice(i, 1)[0]
                    checkGhostCellContent(vanishedGhost)
                    gVanishedGhosts.push(vanishedGhost)
                }

            } else {
                gameOver()
                return
            }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = ghost.color

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost.color))
}


function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}


function getGhostHTML(ghost) {

    if (gPacman.isSuper) {
        return ScaredGHOST_IMG

    } else if ( ghost === '*R') {
        return RedGHOST_IMG

    } else if ( ghost === '*P') {
        return PinkGHOST_IMG

    } else if ( ghost === '*B') {
        return BlueGHOST_IMG
    }
}


function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost.color))
    }
}

function checkGhostCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        updateScore(1)
        gFoodCount--
        ghost.currCellContent = EMPTY

    } else if (ghost.currCellContent === CHERRY) {
        updateScore(10)
        ghost.currCellContent = EMPTY

    } else ghost.currCellContent = EMPTY
}


// function getGhostHTML(ghost) {
//     return `<span style="background-color:${ghost.color};">${GHOST}</span>`
// }