module.exports = {
  ignore: [
    /\/core-js/,
  ],
  presets: [
    '@vue/app',
    ['@babel/preset-env', { modules: false, useBuiltIns: 'entry' }],
   
  ]
}
