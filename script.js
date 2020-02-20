{
  const pValue = document.getElementById("value");

  const slider = new SimpleSlider.SimpleSlider("slider", 0, 100, 0);
  console.log(slider);

  slider.addEventListener("drag-move", (e) => {
    pValue.innerHTML = slider.value.toString() + "%";
  });

  window.addEventListener("resize", () => {
    slider.resize();
  })

}