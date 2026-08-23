'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">`
            
            if (cell === PACMAN) {
                strHTML += PacManLEFT_IMG
            } else if (cell === redGHOST) {
                strHTML += RedGHOST_IMG
            } else if (cell === pinkGHOST) {
                strHTML += PinkGHOST_IMG
            } else if (cell === blueGHOST) {
                strHTML += BlueGHOST_IMG
            } else if (cell === WALL) {
                strHTML += WALL_IMG
            } else if (cell === FOOD) {
                strHTML += FOOD
            } else if (cell === SUPERFOOD) {
                strHTML += SUPERFOOD_IMG
            }
            
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    
    if ( value === SUPERFOOD) {
        elCell.innerHTML = SUPERFOOD_IMG
        
    } else if ( value === CHERRY) {
        elCell.innerHTML = CHERRY_IMG

    } else elCell.innerHTML = value
}


function getClassName(location) { // {i:2,j:5}
    const cellClass = `.cell-${location.i}-${location.j}` // 'cell-2-5'
    return cellClass
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


function findEmptyPos() {
    var emptyPoss = []

    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard.length - 1; j++) {
            var cell = gBoard[i][j]

            if (cell === EMPTY) {
                var pos = { i: i, j: j }
                emptyPoss.push(pos)
            }
        }
    }

    var randIdx = getRandomInt(0, emptyPoss.length)
    var emptyPos = emptyPoss[randIdx]
    // console.log('emptyPoss:', emptyPoss)
    return emptyPos
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
