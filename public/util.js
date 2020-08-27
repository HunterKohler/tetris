const GRID_WIDTH = 20
const GRID_HEIGHT = 20
const FPS = .5

const grid = []
for(let i = 0; i < GRID_WIDTH; i++) {
    grid[i] = []
}

function pos(x = 0,y = 0, i = 0, j = 0){
    return [(x + i) * Peice.BOX_SIZE, (y + j) * Peice.BOX_SIZE]
}


class Peice {
    static BOX_SIZE = 40
    constructor(x,y,SHAPE) {
        this.x = x
        this.y = y
        this.r = 0

        this.SHAPE = SHAPE
        this.onshape(function(i, j, obj) { grid[i][j] = obj } )
        this.draw()
    }

    static style(color, border = '#000000') {
        ctx.lineWidth = 2
        ctx.fillStyle = color
        ctx.strokeStyle = border
    }

    static border(x,y) {
        ctx.strokeRect(x,y,Peice.BOX_SIZE,Peice.BOX_SIZE)
    }

    static box(x,y) {
        ctx.fillRect(x,y,Peice.BOX_SIZE,Peice.BOX_SIZE)
    }

    static draw(x,y) {

    }

    draw(color, border) {
        Peice.style(color, border)
        this.onshape((i,j) => {
            Peice.box(...pos(i,j))
            Peice.border(...pos(i,j))
        })
    }

    clear() {
        this.draw('#FFFFFF', '#FFFFFF')
    }

    onshape(cb) {
        for(let [i,j] of this.SHAPE) {
            cb(this.x + i, this.y + j, this)
        }
    }

    move(dir) {
        this.clear()
        this.onshape((i,j) => delete grid[i][j])
        const d = {
            l: p => p.x--,
            r: p => p.x++,
            u: p => p.y--,
            d: p => p.y++
        }

        d[dir](this)
        this.draw()
    }

    left() { this.move('l') }
    right() { this.move('r') }
    up() { this.move('u') }
    down() { this.move('d') }

    // rotateR() {
    //     for([i,j] of this.shape )
    // }
    //
    // rotateL() {
    //
    // }
}


class L extends Peice{
    static SHAPE = [[0,1],[1,1],[2,0],[2,1]]
    static COLOR = '#FFA500'

    constructor(x,y) {
        super(x,y,L.SHAPE)
    }

    draw(color = L.COLOR, border) {
        super.draw(color, border)
    }
}

class J extends Peice {
    static SHAPE = [[0,0],[0,1],[1,1],[2,1]]
    static COLOR = '#0000FF'

    constructor(x,y) {
        super(x,y,J.SHAPE)
    }

    draw(color = J.COLOR, border) {
        super.draw(color, border)
    }
}

class O extends Peice{
    static SHAPE = [[0,0],[1,0],[0,1],[1,1]]
    static COLOR = '#FFFF00'

    constructor(x,y) {
        super(x,y,O.SHAPE)
    }

    draw(color = O.COLOR, border) {
        super.draw(color, border)
    }
}

class S extends Peice{
    static SHAPE = [[0,1],[1,0],[1,1],[2,0]]
    static COLOR = '#00FF00'

    constructor(x,y) {
        super(x,y,S.SHAPE)
    }

    draw(color = S.COLOR, border) {
        super.draw(color, border)
    }
}

class Z extends Peice{
    static SHAPE = [[0,0],[1,0],[1,1],[2,1]]
    static COLOR = '#FF0000'

    constructor(x,y) {
        super(x,y,Z.SHAPE)
    }

    draw(color = Z.COLOR, border) {
        super.draw(color, border)
    }
}

class T  extends Peice{
    static SHAPE = [[1,0],[0,1],[1,1],[2,1]]
    static COLOR = '#d138ff'

    constructor(x,y) {
        super(x,y,T.SHAPE)
    }

    draw(color = T.COLOR, border){
        super.draw(color, border)
    }
}

class I extends Peice{
    static SHAPE = [[0,0],[1,0],[2,0],[3,0]]
    static COLOR = '#00FFFF'

    constructor(x,y) {
        super(x,y,I.SHAPE)
    }

    draw(color = I.COLOR, border) {
        super.draw(color, border)
    }
}
