module.exports = {
  plugins: [
    require('autoprefixer'),
    {
      'postcss-px-to-viewport': {
        viewportWidth: 750,
      },
    },
  ],
}
