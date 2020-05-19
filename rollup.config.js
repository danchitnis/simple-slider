// rollup.config.js
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/slider.ts",
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  output: [
    { file: pkg.main, format: "umd", name: "SimpleSlider" },
    { file: pkg.module, format: "es" },
  ],
};
