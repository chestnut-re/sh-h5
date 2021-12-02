const path = require('path')
module.exports = ({ file }) => {
  const designWidth = file.toString().indexOf('vant') > -1 ? 375 : 750 //根据设计图设置大小适配vant-react
  return {
    plugins: [
      require('autoprefixer'),
      {
        'postcss-px-to-viewport': {
          viewportWidth: designWidth,
        },
      },
    ],
  }
}
