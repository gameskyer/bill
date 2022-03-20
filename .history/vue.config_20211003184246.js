const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
    // ...
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'less',
          patterns: [
            resolve('path/to/global.less')
          ]
        }
    }
}
