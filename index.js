let canvas = document.querySelector('canvas')
let rows = 50
let cols = 50
let blockSize = 10
canvas.height = rows * blockSize
canvas.width = cols * blockSize
let c = canvas.getContext('2d')

let bluePaddleY = 0
let redPaddleY = 0

addEventListener('keydown', (event) => {
    keyName = event.key
    
    if (keyName === 'w' && bluePaddleY > 0) {
        bluePaddleY += -2
    }
    if (keyName === 's' && bluePaddleY < 46) {
        bluePaddleY += 2
    }
    if (keyName === 'ArrowUp' && redPaddleY > 0) {
        redPaddleY += -2
    }
    if (keyName === 'ArrowDown' && redPaddleY < 46) {
        redPaddleY += 2
    }
})

function getPongin() {
    requestAnimationFrame(getPongin)
    c.clearRect(0, 0,rows * blockSize, cols * blockSize)
    
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
}
getPongin()