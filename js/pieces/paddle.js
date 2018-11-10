import {Rect} from '../geo/rect'

export class Paddle extends Rect {

  constructor ({cpu, width = 10, height = 100, min_y = 50, ...others}) {
    super(others)
    this.min_y = min_y
    this.cpu = cpu
    this.width = width
    this.height = height
    this.resize()
  }

  resize () {
    this.x = parseInt(this.cpu ? this.canvas.width - this.width * 2 : this.width, 10)
    this.y = parseInt((this.canvas.height - this.min_y) / 2 - this.height / 2, 10)
  }

  draw () {
    super.draw()
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
