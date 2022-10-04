const canvas = document.querySelector('canvas')
const rows = 50
const cols = 40
const blockSize = 10
canvas.height = rows * blockSize
canvas.width = cols * blockSize
const c = canvas.getContext('2d')

let bluePaddleY = 22
let redPaddleY = 22
let blueDown = false
let blueUp = false
let redDown = false
let redUp = false

addEventListener('keydown', (event) => {
    keyName = event.key
    
    if (keyName === 'w') {
        blueUp = true
    }
    if (keyName === 's') {
        blueDown = true
    }
    if (keyName === 'ArrowUp') {
        redUp = true
    }
    if (keyName === 'ArrowDown') {
        redDown = true
    }
})

addEventListener('keyup', (event) => {
    keyName = event.key
    
    if (keyName === 'w') {
        blueUp = false
    }
    if (keyName === 's') {
        blueDown = false
    }
    if (keyName === 'ArrowUp') {
        redUp = false
    }
    if (keyName === 'ArrowDown') {
        redDown = false
    }
})

let start = false
let blueReady = false
let redReady = false
addEventListener('keydown', (event) => {
    let keyName = event.key

    if (keyName === 'd') {
        blueReady = true
    }
    if (keyName === 'ArrowLeft') {
        redReady = true
    }
    if (blueReady === true && redReady === true) {
        start = true
    }
})
addEventListener('keyup', (event) => {
    let keyName = event.key

    if (keyName === 'd') {
        blueReady = false
    }
    if (keyName === 'ArrowLeft') {
        redReady = false
    }
})

let ballX
let ballY
let r = blockSize / 2
let dBallX = 4
let dBallY = 4

function placeBall() {
    ballX = ((cols * blockSize) / 2)
    ballY = Math.floor(Math.random() * (((rows - 2) - 2 + 1)) + 2) * blockSize
    if (Math.floor(Math.random() * 2) === 0) {
        dBallX = -dBallX
    }
}
placeBall()

let wait = false
function nextRound() {
    loseCondition = false
    wait = false
    dBallX = 4
    dBallY = 4
    if (Math.floor(Math.random() * 2) === 0) {
        dBallX = -dBallX
    }
}

let loseCondition = false
let blueScore = 0
let redScore = 0
document.getElementById('red-score').value = redScore
document.getElementById('blue-score').value = blueScore

let winCondition = false

function getPongin() {
    
    if (redScore > 20 && redScore > blueScore + 1) {
        winCondition = true
    }
    if (blueScore > 20 && blueScore > redScore + 1) {
        winCondition = true
    }
    if (winCondition === true) return

    if (loseCondition === true && wait === false) {
        wait = true
        
        if (ballX + r < 1 * blockSize) {
            redScore += 1
            document.getElementById('red-score').value = redScore
        }
        if (ballX + r > cols * blockSize) {
            blueScore += 1
            document.getElementById('blue-score').value = blueScore
        }
        placeBall()

        setTimeout(nextRound, 1000)
    }

    requestAnimationFrame(getPongin)
    c.clearRect(0, 0, cols * blockSize, rows * blockSize)
    c.beginPath()
    c.fillStyle='white'
    for (let i = 0; i < rows * blockSize; i++) {
        if (i % 20 === 0) {
            c.fillRect(canvas.width / 2, i + 5, 1, blockSize)
            c.stroke
        }
    }
    

    if (blueUp === true && bluePaddleY > 0) {
        bluePaddleY += -1
    }
    if (blueDown === true && bluePaddleY < rows - 4) {
        bluePaddleY += 1
    }
    if (redUp === true && redPaddleY > 0) {
        redPaddleY += -1
    }
    if (redDown === true && redPaddleY < rows - 4) {
        redPaddleY += 1
    }

    c.beginPath()
    c.fillStyle='blue'
    for (let i = 0; i < 4; i++) {
        c.fillRect(1 * blockSize, (bluePaddleY + i) * blockSize, blockSize, blockSize)
    }

    c.stroke()
    
    c.beginPath()
    c.fillStyle='red'
    for (let i = 0; i < 4; i++) {
        c.fillRect((cols - 2) * blockSize, (redPaddleY + i) * blockSize, blockSize, blockSize)
    }
    c.stroke()

    c.beginPath
    c.strokeStyle='white'
    c.fillStyle='white'
    c.arc(ballX, ballY, r, Math.PI * 2, false)
    c.fill()
    c.stroke()

    if ((ballY + r > rows * blockSize && dBallY > 0) || (ballY + r < blockSize && dBallY < 0)) {
        dBallY = -dBallY
    }
    if (ballX + r < 3 * blockSize && ballX + r > 2 * blockSize && dBallX < 0 && ballY + r >= (bluePaddleY) * blockSize && ballY + r <= (bluePaddleY + 5) * blockSize) {
        if (blueDown === true && dBallY <= 0) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            dBallY = -dBallY
        }
        if(blueUp === true && dBallY >= 0) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            dBallY = -dBallY
        }
        if (blueUp === false && blueDown === false) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            if (Math.floor(Math.random() * 5) === 0) {
                dBallY = 0
                dBallX *= 2
            }
        }
        dBallX = -dBallX
    }
    if (ballX + r > (cols - 2) * blockSize && ballX + r < (cols - 1) * blockSize && dBallX > 0 && ballY + r >= (redPaddleY) * blockSize && ballY + r <= (redPaddleY + 5) * blockSize) {
        if (redDown === true && dBallY <= 0) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            dBallY = -dBallY
        }
        if(redUp === true && dBallY >= 0) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            dBallY = -dBallY
        }
        if (redUp === false && redDown === false) {
            if (dBallY === 0) {
                dBallY += 3
                dBallX /= 2
            }
            if (Math.floor(Math.random() * 5) === 0) {
                dBallY = 0
                dBallX *= 2
            }
        }
        dBallX = -dBallX
    }
    if (ballX + r < -2 * blockSize || ballX + r > (cols + 3) * blockSize) {
        dBallX = 0
        dBallY = 0
        loseCondition = true
    }

    if (start === true) {
    ballX += dBallX
    ballY += dBallY
    }
}
getPongin()
