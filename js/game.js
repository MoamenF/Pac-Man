'use strict'

const WALL = '#'
const FOOD = '●'
const SUPERFOOD = 'S'
const CHERRY = 'C'
const EMPTY = ' '

const WALL_IMG = '<img class="cell-img" src="img/wall2.png">'
const SUPERFOOD_IMG = '<img class="cell-img flash" src="img/superFood.png">'
const CHERRY_IMG = '<img class="cell-img" src="img/cherry.png">'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCount = 0
var gCherryInterval
var gBgAudio



function onInit() {
    
    resetScore()
    gFoodCount = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    randCherrySpawn()
    gGame.isOn = true
    bgAudio('PacMan')
}

function buildBoard() {
    const SIZE = 12
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFoodCount++
            if (i === 1 && j === 1 || 
                i === 1 && j === 10 || 
                i === 10 && j === 1 || 
                i === 10 && j === 10) {
                board[i][j] = SUPERFOOD
                gFoodCount--
            }
            

            if (i === 6 && j === 0 || i === 6 && j === 11) {
                board[i][j] = EMPTY
                gFoodCount--
            }

            if (
                (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 3) || 
                (i === 3 && j > 1 && j < SIZE - 8) || 
                (i === 3 && j > 4 && j < SIZE - 3) || 
                (i === 8 && j > 3 && j < SIZE - 5) ||
                (i === 6 && j > 5 && j < SIZE - 4) ||
                (i === 8 && j > 7 && j < SIZE - 2)) 
                &&
                !(i === 6 && j === 0) && !(i === 6 && j === 11)
                
            ){
                board[i][j] = WALL
                gFoodCount --
            }
        }
    }
    console.table(board)
    return board
}


function randCherrySpawn() {

	gCherryInterval = setInterval(() => {
	var pos = findEmptyPos()
    // console.log('pos:', pos)
    if (!pos) {
		return
	}

	gBoard[pos.i][pos.j] = CHERRY
	renderCell(pos, CHERRY_IMG)

	}, 15000);
}


// function checkVictory() {

//     for (var i = 1; i < gBoard.length - 1; i++) {
//         for (var j = 1; j < gBoard.length - 1; j++) {
//             var cell = gBoard[i][j]
//             // console.log('cell V:', cell)

//             if (cell === FOOD) {
//                 return
//             }
//         }
//     }
//     const elModal = document.querySelector('.modal h1').innerText = 'YOU WON!'
//     gameOver()
// }


function checkVictory() {
    if (gFoodCount === 0) {
        gGame.isOn = false
        clearInterval(gGhostsInterval)
        gGhostsInterval = null
        clearInterval(gCherryInterval)
        const elModalH1 = document.querySelector('.modal h1').innerText = 'YOU WON!'
        const elModal = document.querySelector('.modal').hidden = false

    } else return
}


function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function resetScore() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
}

function onNewGame() {
    const elModal = document.querySelector('.modal').hidden = true
    gBgAudio.pause()
    gBgAudio.currentTime = 0
    onInit()
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    gGhostsInterval = null
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, EMPTY)
    const elModalHi = document.querySelector('.modal h1').innerText = 'GAME OVER!'
    const elModal = document.querySelector('.modal').hidden = false
}

function onRestart() {
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    gGhostsInterval = null
    clearInterval(gCherryInterval)
    gBgAudio.pause()
    gBgAudio.currentTime = 0
    onInit()
}

function onPause(elBtn) {
    if (!gGame.isOn){
        gGhostsInterval = setInterval(moveGhosts, 2000)
        randCherrySpawn()

        gGame.isOn = true
        elBtn.innerText = 'Pause'
        console.log('gGame.isOn:', gGame.isOn)

    } else {
        clearInterval(gGhostsInterval)
        clearInterval(gCherryInterval)
        gGame.isOn = false
        elBtn.innerText = 'Resume'
        console.log('gGame.isOn:', gGame.isOn)
    }
}


function onMute(elBtn) {
    gBgAudio.muted = !gBgAudio.muted

    if (gBgAudio.muted) elBtn.innerText = 'UnMute'
    if (!gBgAudio.muted) elBtn.innerText = 'Mute'
}


function bgAudio(audioName) {
   gBgAudio = new Audio(`audio/${audioName}.mp3`)
    gBgAudio.volume = 0.03
    gBgAudio.loop = true
    gBgAudio.play()
}
