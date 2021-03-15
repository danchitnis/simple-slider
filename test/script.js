import { SimpleSlider } from "../dist/slider.js";

{
  const pValue = document.getElementById("value");
  const pValueFinal = document.getElementById("value-final");

  const slider = [];

  slider[0] = new SimpleSlider("slider1", 0, 100, 0);

  slider[1] = new SimpleSlider("slider2", 0, 100, 11);

  slider[2] = new SimpleSlider("slider3", 0, 12, 13);

  slider.forEach((e) => {
    e.callBackUpdate = () => {
      pValue.innerHTML = e.value.toPrecision(4);
    };
  });

  slider.forEach((e) => {
    e.callBackDragEnd = () => {
      pValueFinal.innerHTML = e.value.toPrecision(4);
    };
  });

  window.addEventListener("resize", () => {
    slider.forEach((e) => {
      e.resize();
    });
  });

  const btSet = document.getElementById("btSet");
  const inputText = document.getElementById("inputText");

  btSet.addEventListener("click", () => {
    const val = parseFloat(inputText.value);

    slider.forEach((e) => {
      e.setValue(val);
    });
  });

  let debug = false;
  const btDebug = document.getElementById("btDebug");
  btDebug.addEventListener("click", () => {
    slider.forEach((e) => {
      e.setDebug(!debug);
    });
    debug = !debug;
  });

  let enable = true;
  const btEnable = document.getElementById("btEnable");
  btEnable.addEventListener("click", () => {
    slider.forEach((e) => {
      e.setEnable(!enable);
      console.log(enable);
    });
    enable = !enable;
  });
}
