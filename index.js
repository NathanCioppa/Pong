let canvas = document.querySelector('canvas')
let rows = 50
let cols = 50
let blockSize = 10
canvas.height = rows * blockSize
canvas.width = cols * blockSize
let c = canvas.getContext('2d')

let bluePaddleY = 0
let redPaddleY = 0
let blueUp = false
let blueDown = false
let redUp = false
let redDown = false

addEventListener('keydown', (event) => {
    keyName = event.key
    
    if (keyName === 'w') {
        blueDown = true
    }
    if (keyName === 's') {
        blueUp = true
    }
    if (keyName === 'ArrowUp') {
        redDown = true
    }
    if (keyName === 'ArrowDown') {
        redUp = true
    }
})

addEventListener('keyup', (event) => {
    keyName = event.key
    
    if (keyName === 'w') {
        blueDown = false
    }
    if (keyName === 's') {
        blueUp = false
    }
    if (keyName === 'ArrowUp') {
        redDown = false
    }
    if (keyName === 'ArrowDown') {
        redUp = false
    }
})

let ballX = ((cols * blockSize) / 2)
let ballY = Math.floor(Math.random() * rows) * blockSize
let r = blockSize / 2
let dBallX = 3
let dBallY = 3

function getPongin() {
    requestAnimationFrame(getPongin)
    c.clearRect(0, 0,rows * blockSize, cols * blockSize)

    if (blueDown === true && bluePaddleY > 0) {
        bluePaddleY += -1
    }
    if (blueUp === true && bluePaddleY < 46) {
        bluePaddleY += 1
    }
    if (redDown === true && redPaddleY > 0) {
        redPaddleY += -1
    }
    if (redUp === true && redPaddleY < 46) {
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
        c.fillRect(48 * blockSize, (redPaddleY + i) * blockSize, blockSize, blockSize)
    }
    c.stroke()

    c.beginPath
    c.fillStyle='black'
    c.arc(ballX, ballY, r, Math.PI * 2, false)
    c.stroke()

    if(ballX + r > rows * blockSize || ballX + r < 0) {
        dBallX = -dBallX
    }
    if (ballY + r > cols * blockSize || ballY + r < 0) {
        dBallY = -dBallY
    }
    
    ballX += dBallX
    ballY += dBallY

    
}
getPongin()