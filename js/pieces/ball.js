import {Circle} from '../geo/circle'

export class Ball extends Circle {

  constructor ({offset_y = 10, ...others}) {
    super(others)
    this.offset_y = offset_y
    this.velocityX = null
    this.velocityY = null
    this.acceleration = null
  }

  resize () {
    this.x = parseInt(this.canvas.width / 2, 10)
    this.y = parseInt(this.canvas.height / 2, 10)
  }

  start (direction = Math.sign(Math.random() * 2 - 1)) {
    this.resize()
    this.velocityX = 5 * direction
    this.velocityY = parseInt(Math.random() * 8) - 4
    this.acceleration = 7
  }

  stop () {
    this.x = null
    this.y = null
    this.velocityX = null
    this.velocityY = null
    this.acceleration = null
  }

  draw () {
    super.draw()
    this.ctx.fillStyle = 'white'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  }

}
