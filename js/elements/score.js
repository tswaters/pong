import {Label} from '../ui/label'

const margin = 5
const height = 50
const width = 35
const y = 0

let canvas = null
let ctx = null

const score = {
  user: 0,
  cpu: 0
}

const labels = {
  user: null,
  cpu: null
}

export function init ({canvas: _canvas}) {
  canvas = _canvas
  ctx = canvas.getContext('2d')

  const user_label = new Label({
    ctx,
    y,
    width,
    height
  })

  const cpu_label = new Label({
    ctx,
    y,
    width,
    height
  })

  labels.user = user_label
  labels.cpu = cpu_label
}

export function resize () {
  labels.cpu.x = canvas.width / 2 + margin + 5
  labels.cpu.reset()
  labels.cpu.draw(score.cpu)
  labels.user.x = canvas.width / 2 - width - margin - 5
  labels.user.reset()
  labels.user.draw(score.user)
}

export function start () {
  labels.user.draw(score.user)
  labels.cpu.draw(score.cpu)
}

export function reset () {
  score.user = 0
  score.cpu = 0
  labels.user.draw(score.user)
  labels.cpu.draw(score.cpu)
}

export function increment (player) {
  score[player] += 1
  labels[player].draw(score[player])
}
