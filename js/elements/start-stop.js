/* global __ */

import {Button} from '../ui/button'
import {Label} from '../ui/label'
import {start as start_action, stop as stop_action} from './game'

const screen_width = 200
const screen_height = 200

let canvas = null
let start_stop_button = null
let paused_label = null
let text = null

export function init ({canvas:  _canvas}) {

  canvas = _canvas

  start_stop_button = new Button({
    canvas,
    ctx: canvas.getContext('2d'),
    y: 10,
    height: 20,
    width: 20
  })

  paused_label = new Label({
    canvas,
    ctx: canvas.getContext('2d'),
    border: true,
    fontSize: '72pt',
    width: screen_width,
    height: screen_height
  })

  start_stop_button.start()
  document.addEventListener('keydown', handle_esc)
  start(false)
}

export function resize () {
  start_stop_button.x = canvas.width - 30
  paused_label.x = canvas.width / 2 - screen_width / 2
  paused_label.y = canvas.height / 2 - screen_height / 2
  start_stop_button.reset()
  start_stop_button.draw(text)
}

export function start (run = true) {
  text = __('Pause')
  start_stop_button.draw(text)
  start_stop_button.action = stop
  paused_label.clear()
  if (run) { start_action() }
}

export function stop () {
  text = __('Start')
  start_stop_button.draw(text)
  start_stop_button.action = start
  stop_action()
  paused_label.draw(__('Pause'))
}

function handle_esc (ev) {
  if (ev.keyCode === 27) {
    start_stop_button.action()
  }
}
