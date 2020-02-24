{
  const pValue = document.getElementById("value");
  const pValueFinal = document.getElementById("value-final");

  const slider = new SimpleSlider.SimpleSlider("slider", 0, 100, 0);

  slider.addEventListener("update", e => {
    pValue.innerHTML = slider.value.toPrecision(4) + "%";
  });

  slider.addEventListener("drag-end", e => {
    pValueFinal.innerHTML = slider.value.toPrecision(4) + "%";
  });

  window.addEventListener("resize", () => {
    slider.resize();
  });
}
