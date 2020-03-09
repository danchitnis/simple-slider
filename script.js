{
  const pValue = document.getElementById("value");
  const pValueFinal = document.getElementById("value-final");

  const slider = [];

  slider[0] = new SimpleSlider.SimpleSlider("slider1", 0, 100, 0);

  slider[1] = new SimpleSlider.SimpleSlider("slider2", 0, 100, 10);

  slider[2] = new SimpleSlider.SimpleSlider("slider3", 1, 10, 10);

  slider.forEach(e => {
    e.addEventListener("update", () => {
      pValue.innerHTML = e.value.toPrecision(4);
    });
  });

  slider.forEach(e => {
    e.addEventListener("drag-end", () => {
      pValueFinal.innerHTML = e.value.toPrecision(4);
    });
  });

  /*slider1.addEventListener("update", e => {
    pValue.innerHTML = slider1.value.toPrecision(4) + "%";
  });*/

  /*slider1.addEventListener("drag-end", e => {
    pValueFinal.innerHTML = slider1.value.toPrecision(4) + "%";
  });*/

  window.addEventListener("resize", () => {
    slider.forEach(e => {
      e.resize();
    });
  });

  const btSet = document.getElementById("btSet");
  const inputText = document.getElementById("inputText");

  btSet.addEventListener("click", () => {
    const val = parseFloat(inputText.value);

    slider.forEach(e => {
      e.setValue(val);
    });
  });
}
