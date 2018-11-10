export class Rect {
  constructor ({x, y, width, height, canvas, ctx}) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get centerX () {
    return this.x + this.width / 2
  }

  get centerY () {
    return this.y + this.height / 2
  }

  get top () {
    return this.y
  }

  get right () {
    return this.x + this.width
  }

  get bottom () {
    return this.y + this.height
  }

  get left () {
    return this.x
  }

  reset () {
    this.snapshot = null
  }

  clear (snapshot) {
    if (!snapshot) { snapshot = this.snapshot}
    if (!snapshot) { return }
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(
      snapshot.x,
      snapshot.y,
      snapshot.width,
      snapshot.height
    )
  }

  draw () {
    if (this.snapshot) {
      this.clear(this.snapshot)
    }
    this.snapshot  = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}
