// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    // "postcss-pxtorem": {
    //   "rootValue": 32,
    //   "propList": ["*"]
    // },
    // "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
      remUnit: 75,
      exclude: /node_modules/
    }
    // "postcss-viewport-units": {},
    // "cssnano": {
    //   preset: "advanced",
    //   autoprefixer: false,
    //   "postcss-zindex": false
    // }
  }
}
