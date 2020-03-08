{
  const pValue = document.getElementById("value");
  const pValueFinal = document.getElementById("value-final");

  const slider = new SimpleSlider.SimpleSlider("slider", 0, 100, 10);

  slider.addEventListener("update", e => {
    pValue.innerHTML = slider.value.toPrecision(4) + "%";
  });

  slider.addEventListener("drag-end", e => {
    pValueFinal.innerHTML = slider.value.toPrecision(4) + "%";
  });

  window.addEventListener("resize", () => {
    slider.resize();
  });

  const btSet = document.getElementById("btSet");
  btSet.addEventListener("click", () => {
    slider.setPositionValue(40);
  });
}
