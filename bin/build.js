/* eslint-disable no-console */

import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

import webpackConfig from '../webpack/production'

const bundler = webpack(webpackConfig)

const progressPlugin = new ProgressPlugin((percentage, info) => {
  const msg = `${Math.round(percentage * 100)}% ${info}`
  if (!process.stdout.isTTY) {
    return console.log(msg)
  }

  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(msg)
})

bundler.apply(progressPlugin)

bundler.run((err, stats) => {
  if (err) {
    return console.log(err)
  }

  console.log(stats.toString(webpackConfig.stats))
})
