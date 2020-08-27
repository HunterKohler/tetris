const canvas = document.querySelector('canvas')

canvas.width = WIDTH = Peice.BOX_SIZE * GRID_WIDTH
canvas.height = HEIGHT = Peice.BOX_SIZE * GRID_HEIGHT

const ctx = canvas.getContext('2d')

const active = new O(9,9)

const binds = []
binds[65] = () => {active.left()}
binds[68] = () => {active.right()}
document.addEventListener('keydown', (e) => {
    console.log(e.keyCode)
    if(binds[e.keyCode]) {
        binds[e.keyCode]()
    }
})
