const canvas = document.querySelector('canvas')

canvas.width = WIDTH = Box.SIZE * GRID_WIDTH
canvas.height = HEIGHT = Box.SIZE * GRID_HEIGHT

const ctx = canvas.getContext('2d')

const grid = []
const rowcount = []
for(let i in [...Array(GRID_WIDTH)]) {
    grid[i] = []
    for(let j in [...Array(GRID_HEIGHT)]) {
        rowcount[j] = 0
        Box.drawBorder(i,j)
    }
}

let active = spawn()
const binds = []
binds[32] = () => {(paused ? restartInterval() : clearInterval(step)); paused = !paused}
binds[65] = () => active.left()
binds[68] = () => active.right()
binds[74] = () => active.rotateR()
binds[76] = () => active.rotateL()
binds[83] = () => active.down()
binds[87] = () => active.hard()
document.addEventListener('keydown', (e) => {
    if(binds[e.keyCode]) {
        binds[e.keyCode]()
    }
})

function clearrow(row) {
    for(let i = 0; i < GRID_WIDTH;i++) {
        for(let j = row; j > 0;j--) {
            grid[i][j] = grid[i][j - 1]
            if(grid[i][j]) {
                grid[i][j].j--
                grid[i][j].draw()
            } else {
                EmptyBox.draw(i,j)
            }
        }
    }

    rowcount.pop()
    rowcount.unshift(0)
}

const stepper =
    () => {
        if(!active.down()) {
            active.boxify()
            for(let j = rowcount.length; j > 0;j--)
            {
                if(rowcount[j] == GRID_WIDTH) {
                    clearrow(j)
                    j++
                }
            }
            active = spawn()
        }
    }

const restartInterval = () => step = setInterval(stepper, 1000/FPS)
let paused = false
let step = setInterval(stepper, 1000 / FPS)
