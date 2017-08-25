var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  // postcss:[require('postcss-px2rem')({'remUnit':75})]
  postcss:[ 
    require('postcss-plugin-px2rem')({
      rootValue: 75, // 这里对应的是750的设计图尺寸
      // selectorBlackList: ['html'],
      mediaQuery: true,
      propBlackList: ['border-radius'] // 如果要保持font-size不转换，替换为 ['font-size']
    })
  ]
}
