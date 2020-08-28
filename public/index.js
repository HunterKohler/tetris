const canvas = document.querySelector('canvas')

canvas.width = WIDTH = Box.SIZE * GRID_WIDTH
canvas.height = HEIGHT = Box.SIZE * GRID_HEIGHT

const ctx = canvas.getContext('2d')

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
                grid.j--
                grid[i][j].draw()
            } else {
                EmptyBox.draw(i,j)
            }
            rowcount[i][j] = rowcount[i][j - 1]
        }
    }
}

const stepper =
    () => {
        if(!active.down()) {
            active.boxify()
            for(j in rowcount) {
                if(rowcount[j] == GRID_WIDTH) {
                    clearrow(j)
                }
            }
            active = spawn()
        }
    }

const restartInterval = () => step = setInterval(stepper, 1000/FPS)
let paused = false
let step = setInterval(stepper, 1000 / FPS)
