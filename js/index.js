/* global __, process */

import '../sass/index.scss'
import * as offline  from 'offline-plugin/runtime'
import {Label} from './ui/label'

import {
  init as init_game,
  start as start_game,
  resize as resize_game
} from './elements/game'

import {
  init as init_start_stop,
  start as start_start_stop,
  resize as resize_start_stop,
  stop
} from './elements/start-stop'

import {
  init as init_score,
  start as start_score,
  reset as reset_score,
  resize as resize_score
} from './elements/score'

const version = process.env.VERSION

offline.install({
  onUpdateReady () { offline.applyUpdate() },
  onUpdated () { window.location.reload() }
})

let canvas = null
let ctx = null
let title = null

document.addEventListener('DOMContentLoaded', () => {

  canvas = document.getElementById('game')
  ctx = canvas.getContext('2d')

  title = new Label({
    canvas,
    ctx,
    x: 0,
    y: 0,
    width: 200,
    height: 50
  })


  init_game({canvas, ctx})
  init_score({canvas, ctx})
  init_start_stop({canvas, ctx})

  resize()

  start_game()
  start_start_stop(false)
  start_score()
  reset_score()

})

function resize () {

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  title.draw(`${__('Pong')} v${version}`)
  resize_start_stop()
  resize_score()
  resize_game()
}

window.addEventListener('resize', () => {
  resize()
  stop()
})
