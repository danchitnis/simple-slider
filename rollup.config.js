// rollup.config.js
import embedCSS from 'rollup-plugin-embed-css';

export default {
    input: './dist/slider.js',
    output: {
      file: './dist/bundle.js',
      format: 'iife',
      name: "ss"
    },
    plugins: [
        embedCSS(),
      ],
  };