import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

import webpackConfig from '../webpack/production'

const bundler = webpack(webpackConfig)

const progressPlugin = new ProgressPlugin((percentage, info) => {
  const msg = `${Math.round(percentage * 100)}% ${info}`
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(msg)
})

bundler.apply(progressPlugin)

bundler.run((err, stats) => {
  if (err) { return console.log(err) } // eslint-disable-line no-console
  console.log(stats.toString(webpackConfig.stats)) // eslint-disable-line no-console
})
