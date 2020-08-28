const canvas = document.querySelector('canvas')

canvas.width = WIDTH = Peice.BOX_SIZE * GRID_WIDTH
canvas.height = HEIGHT = Peice.BOX_SIZE * GRID_HEIGHT

const ctx = canvas.getContext('2d')

let active
const binds = []
binds[65] = () => active.left()
binds[68] = () => active.right()
binds[74] = () => active.rotateR()
binds[76] = () => active.rotateL()
binds[87] = () => active.hard()
document.addEventListener('keydown', (e) => {
    if(binds[e.keyCode]) {
        binds[e.keyCode]()
    }
})
