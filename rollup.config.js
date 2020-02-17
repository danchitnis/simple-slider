// rollup.config.js

export default {
    input: './dist/slider.js',
    output: {
      file: './dist/bundle.js',
      format: 'iife',
      name: "SimpleSlider"
    },
  };