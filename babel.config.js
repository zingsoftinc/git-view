export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.5%, ie >= 11"
        }
      }
    ]
  ]
};