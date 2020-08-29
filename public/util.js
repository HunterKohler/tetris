const inGrid = (i,j) => j >= 0 && i >= 0 && j < GRID_HEIGHT && i < GRID_WIDTH
const vAdd = ([a,b],[c,d]) => [a + c, b + d]

class Peice {
    constructor(x,y,Child) {
        this.x = x
        this.y = y

        this.shape = Child.SHAPE
        this.color = Child.COLOR
        this.fillgrid()
        this.draw()
    }

    draw(color) {
        Box.style(color)
        this.onshape(Box.draw)
    }

    clear() {
        this.draw(COLORS.WHITE,COLORS.WHITE)
    }

    onshape(cb, shape) {
        for(let [i,j] of shape || this.shape) {
            cb(this.x + i, this.y + j, this)
        }
    }

    move(dir) {
        const [dx, dy] = {
            l: [-1,0],
            r: [1,0],
            u: [0,-1],
            d: [0,1]
        }[dir]

        let valid = true
        this.onshape((i,j,obj) => {
            const [di, dj] = [i + dx, j + dy]
            valid = valid && inGrid(di,dj) &&
                (grid[di][dj] == obj || grid[di][dj] == undefined)
        })
        if(valid) {
            this.clear()
            this.emptygrid()
            this.x += dx
            this.y += dy
            this.fillgrid()
            this.draw()
        }

        return valid
    }

    left() { return this.move('l') }
    right() { return this.move('r') }
    up() { return this.move('u') }
    down() { return this.move('d') }


    hard() {
        while(true) {
            if(!this.down()) { return }
        }
    }

    rotate(dir) {
        const shape = []
        this.shape.forEach(([i,j]) => shape.push(dir == 'L' ? [-j,i] : [j,-i]))

        let valid = true
        this.onshape((i,j,obj) => {
            valid = valid && inGrid(i,j) &&
                (grid[i][j] == obj || grid[i][j] == undefined)
        }, shape)

        if(valid) {
            this.clear()
            this.emptygrid()
            this.shape = shape
            this.fillgrid()
            this.draw()
        }

        return valid
    }

    rotateL() { this.rotate('L') }
    rotateR() { this.rotate('R') }

    emptygrid() {
        this.onshape((i,j) => {
            rowcount[j]--
            delete grid[i][j]
        })
    }

    fillgrid() {
        this.onshape((i,j,obj) => {
            rowcount[j]++
            grid[i][j] = obj
        })
    }

    boxify() {
        this.onshape((i,j,obj) => {
            grid[i][j] = new Box(i,j,obj.color)
        })
    }
}


class L extends Peice{
    static SHAPE = [[-1,0],[0,0],[1,0],[1,-1]]
    static COLOR = '#FFA500'

    constructor(x = 4,y = 1) {
        super(x,y,L)
    }

    draw(color = this.color, border) {
        super.draw(color, border)
    }
}

class J extends Peice {
    static SHAPE = [[-1,-1],[-1,0],[0,0],[1,0]]
    static COLOR = '#0000FF'

    constructor(x = 4,y = 1) {
        super(x,y,J)
    }

    draw(color = this.color, border) {
        super.draw(color, border)
    }
}

class O extends Peice{
    static SHAPE = [[0,0],[1,0],[0,1],[1,1]]
    static COLOR = '#FFFF00'

    constructor(x = 4,y = 0) {
        super(x,y,O)
    }

    draw(color = this.color, border) {
        super.draw(color, border)
    }

    rotate() {}
}

class S extends Peice{
    static SHAPE = [[-1,1],[0,1],[0,0],[1,0]]
    static COLOR = '#00FF00'

    constructor(x = 4,y = 0) {
        super(x,y,S)
    }

    draw(color = this.color) {
        super.draw(color, border)
    }
}

class Z extends Peice{
    static SHAPE = [[-1,0],[0,0],[0,1],[1,1]]
    static COLOR = '#FF0000'

    constructor(x = 4,y = 0) {
        super(x,y,Z)
    }

    draw(color = this.color, border) {
        super.draw(color, border)
    }
}

class T extends Peice{
    static SHAPE = [[-1,0],[0,0],[0,-1],[1,0]]
    static COLOR = '#d138ff'

    constructor(x = 4,y = 1) {
        super(x,y,T)
    }

    draw(color = this.color, border){
        super.draw(color, border)
    }
}

class I extends Peice{
    static SHAPE = [[-1,0],[0,0],[1,0],[2,0]]
    static COLOR = '#00FFFF'
    static SHAPES = [
        [[-2,0],[-1,0],[0,0],[1,0]],
        [[0,-2], [0,-1], [0,0], [0,1]]
    ]

    constructor(x = 4,y = 1) {
        super(x,y,I)
        this.r = 0
    }

    draw(color = this.color, border) {
        super.draw(color, border)
    }

    rotate() {
        const shape = I.SHAPES[(this.r + 1) % 2]

        let valid = true
        this.onshape((i,j,obj) => {
            valid = valid && inGrid(i,j) &&
                (grid[i][j] == obj || grid[i][j] == undefined)
        }, shape)

        if(valid) {
            this.clear()
            this.emptygrid()
            this.shape = shape
            this.r = (this.r + 1) % 2
            this.fillgrid()
            this.draw()
        }

        return valid
    }
}

class Box  {
    static BORDER_SIZE = 2
    static BORDER_COLOR = COLORS.LIGHT_GREY
    static SIZE = BOX_SIZE

    static style(color) {
        ctx.fillStyle = color
    }

    static pos(i,j){
        return [i * Box.SIZE, j * Box.SIZE]
    }

    static draw(i,j) {
        const [x,y] = Box.pos(i,j)
        ctx.fillRect(
            x + Box.BORDER_SIZE - 1,
            y + Box.BORDER_SIZE - 1,
            Box.SIZE - Box.BORDER_SIZE,
            Box.SIZE - Box.BORDER_SIZE
        )
    }

    static drawBorder(i,j,color = Box.BOX_COLOR) {
        const [x,y] = Box.pos(i,j,color)
        ctx.strokeRect(x,y,Box.SIZE,Box.SIZE)
    }

    constructor(i,j,color) {
        this.i = i
        this.j = j
        this.color = color
    }

    draw() {
        this.style()
        Box.draw(this.i,this.j)
    }

    clear() {
        Box.style(COLORS.WHITE)
    }

    style(color = this.color) {
        Box.style(color)
    }
}

class EmptyBox extends Box {
    static draw(i,j) {
        super.style(COLORS.WHITE)
        super.draw(i,j)
    }
}

const spawn = () => new [I,O,J,L,S,Z,T][Math.floor(Math.random() * 4)]
