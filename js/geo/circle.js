export class Circle {

  constructor ({radius, x, y, canvas, ctx}) {
    this.canvas = canvas
    this.x = x
    this.y = y
    this.radius = radius
    this.ctx = ctx
  }

  get top () {
    return this.y - this.radius
  }

  get bottom () {
    return this.y + this.radius
  }

  get left () {
    return this.x - this.radius
  }

  get right () {
    return this.x + this.radius
  }

  reset () {
    this.snapshot = null
  }

  clear (snapshot) {
    if (!snapshot) { snapshot = this.snapshot }
    if (!snapshot) { return }
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(
      this.snapshot.x - this.radius,
      this.snapshot.y - this.radius,
      this.snapshot.radius * 2,
      this.snapshot.radius * 2
    )
  }

  draw () {
    if (this.snapshot) {
      this.clear(this.snapshot)
    }
    this.snapshot  = {
      x: this.x,
      y: this.y,
      radius: this.radius
    }
  }

}
