import {Rect} from '../geo/rect'

export class Board extends Rect {

  constructor ({offset_y = 50, ...others}) {
    super(others)
    this.offset_y = offset_y
    this.resize()
  }

  resize () {
    this.x = this.canvas.width / 2 - this.width / 2
  }

  draw () {
    this.ctx.save()
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, this.offset_y - 3, this.canvas.width, 3)
    this.ctx.strokeStyle = 'white'
    this.ctx.setLineDash([5, 5])
    this.ctx.strokeRect(
      this.x,
      this.offset_y,
      this.width,
      this.canvas.height - this.offset_y
    )
    this.ctx.restore()
  }
}
