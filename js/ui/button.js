import {Rect} from '../geo/rect'

export class Button extends Rect {

  constructor ({
    canvas,
    action,
    text,
    border = false,
    ...others
  }) {
    super(others)
    this.canvas = canvas
    this.action = action
    this.text = text
    this.border = border
    this.handleClick = this.handleClick.bind(this)
  }

  start () {
    this.canvas.addEventListener('click', this.handleClick)
  }

  stop () {
    this.canvas.removeEventListener('click', this.handleClick)
  }

  handleClick (evt) {
    const {x, y, height, width} = this
    const {offsetX, offsetY} = evt
    if (offsetX > x && offsetX < width + x && offsetY > y && offsetY < height + y) {
      this.action()
    }
  }

  draw (text) {
    const {x, y, height, width} = this

    if (this.border) {
      this.ctx.strokeStyle = 'white'
      this.ctx.strokeRect(
        this.x + 1,
        this.y + 1,
        this.width - 2,
        this.height - 2
      )
    }

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(x, y, width, height)
    this.ctx.fillStyle = 'white'
    this.ctx.font = `${this.height}px sans-serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2, this.width)
  }

}
