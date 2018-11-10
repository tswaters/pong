import {Rect} from '../geo/rect'

export class Label extends Rect {

  constructor ({
    color = 'white',
    backColor = 'black',
    border = false,
    ...others
  }) {
    super(others)
    this.color = color
    this.backColor = backColor
    this.border = border
  }

  draw (label) {
    super.draw()

    this.clear()

    if (this.border) {
      this.ctx.strokeStyle = 'white'
      this.ctx.strokeRect(
        this.x + 1,
        this.y + 1,
        this.width - 2,
        this.height - 2
      )
    }

    this.ctx.fillStyle = this.color
    this.ctx.font = `${this.height * .7 |0}px sans-serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(label, this.x + this.width / 2, this.y + this.height / 2, this.width)
  }

}
