import {Ball} from '../pieces/ball'
import {Paddle} from '../pieces/paddle'
import {Board} from '../pieces/board'
import {increment} from './score'

let draw_id = null
let canvas = null
let ctx = null
// let canvas_height = null
// let canvas_width = null
let user = null
let cpu = null
let ball = null
let net = null
let offset_y = 50

export function init ({canvas: _canvas}) {
  canvas = _canvas
  ctx = _canvas.getContext('2d')
  // canvas_height = canvas.height
  // canvas_width = canvas.width
  user = new Paddle({canvas, ctx, width: 10, height: 100, cpu: false})
  cpu = new Paddle({canvas, ctx, width: 10, height: 100, cpu: true})
  ball = new Ball({canvas, ctx, x: canvas.width / 2, y: canvas.height / 2, radius: 10})
  net = new Board({canvas, ctx, width: 10})
  ball.start()
}

export function resize () {
  user.reset()
  user.resize()
  user.draw()
  cpu.reset()
  cpu.resize()
  cpu.draw()
  ball.reset()
  ball.resize()
  ball.draw()
  net.reset()
  net.resize()
  net.draw()
}

export function start () {
  draw_id = window.requestAnimationFrame(main)
  document.addEventListener('mousemove', handleMouseMove)
}

export function stop () {
  window.cancelAnimationFrame(draw_id)
  document.removeEventListener('mousemove', handleMouseMove)
}

function handleMouseMove (e) {
  const rect = canvas.getBoundingClientRect()
  user.y = parseInt(e.clientY - rect.top - user.height / 2, 10)
  user.y = Math.min(user.y, canvas.height - user.height)
  user.y = Math.max(user.y, offset_y)
}

function main () {
  draw_id = requestAnimationFrame(main)

  user.draw()
  cpu.draw()
  ball.draw()
  net.draw()

  cpu.y += parseInt(( ( ball.y - ( cpu.y + cpu.height / 2 ) ) ) * 0.1, 10)
  cpu.y = Math.min(cpu.y, cpu.canvas.height - cpu.height)
  cpu.y = Math.max(cpu.y, cpu.min_y)

  ball.x += parseInt(ball.velocityX, 10)
  ball.y += parseInt(ball.velocityY, 10)

  // going over the top, reverse y & ensure ball can't go over.
  if (ball.y - ball.radius < offset_y) {
    ball.y =  Math.max(offset_y + ball.radius, ball.y)
    ball.velocityY *= -1
  }

  // going under the bottom, reverse y & ensure ball can't go under
  if (ball.y > canvas.height - ball.radius) {
    ball.y = Math.min(canvas.height - ball.radius, ball.y)
    ball.velocityY *= -1
  }

  let paddle = null
  if (ball.right > cpu.left) {
    paddle = cpu
  } else if (ball.left < user.right) {
    paddle = user
  }

  if (paddle) {

    const hit = ball.bottom > paddle.top && ball.top < paddle.bottom

    if (hit && paddle === cpu) {
      ball.x = Math.min(cpu.left, ball.right) - ball.radius
    }

    if (hit && paddle === user) {
      ball.x = Math.max(user.right, ball.left) + ball.radius
    }

    if (hit) {

      const angle = Math.PI / 4 * (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2)
      ball.acceleration += 0.5
      ball.velocityX = parseInt(-1 * Math.sign(ball.velocityX) * ball.acceleration * Math.cos(angle), 10)
      ball.velocityY = parseInt(ball.acceleration * Math.sin(angle), 10)

    }
  }

  if (ball.left > canvas.width) {
    increment('user')
    ball.start(-1)
  }

  if (ball.right < 0) {
    increment('cpu')
    ball.start(1)
  }

}
