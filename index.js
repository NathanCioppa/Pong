const canvas = document.querySelector('canvas')
const rows = 50
const cols = 50
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

let r = blockSize / 2
let ballX = ((cols * blockSize) / 2)
let ballY = Math.floor(Math.random() * rows - 1) * blockSize - r
let dBallX = 3
let dBallY = 3

if (Math.floor(Math.random() * 2) === 0) {
    dBallX = -dBallX
}

function getPongin() {
    requestAnimationFrame(getPongin)
    c.clearRect(0, 0, cols * blockSize, rows * blockSize)
    c.beginPath()
    c.fillStyle='black'
    c.fillRect(canvas.width / 2, 0, 1, rows * blockSize)
    c.stroke

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
    c.fillStyle='black'
    c.arc(ballX, ballY, r, Math.PI * 2, false)
    c.fill()
    c.stroke()

    if (ballY + r > rows * blockSize || ballY + r < blockSize) {
        dBallY = -dBallY
    }
    if (ballX + r < 3 * blockSize && ballX + r > 2 * blockSize && dBallX < 0 && ballY + r > (bluePaddleY) * blockSize && ballY + r < (bluePaddleY + 4) * blockSize) {
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
    if (ballX + r > (cols - 2) * blockSize && ballX + r < (cols - 1) * blockSize && dBallX > 0 && ballY + r > (redPaddleY) * blockSize && ballY + r < (redPaddleY + 4) * blockSize) {
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
    if (ballX + r < 1 * blockSize || ballX + r > cols * blockSize) {
        dBallX += -dBallX
        dBallY += -dBallY
    }
    
    ballX += dBallX
    ballY += dBallY
    
}
getPongin()