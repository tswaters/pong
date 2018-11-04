
import '../sass/index.scss'
import * as offline  from 'offline-plugin/runtime'

offline.install({
  onUpdateReady () { offline.applyUpdate() },
  onUpdated () { window.location.reload() }
})
