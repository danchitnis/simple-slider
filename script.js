{
  const pValue = document.getElementById("value");

  const slider = new SimpleSlider("slider", 0, 100, 0);
  console.log(slider);

  slider.addEventListener("update", (e) => {
    pValue.innerHTML = slider.value.toString() + "%";
  });

  window.addEventListener("resize", () => {
    slider.resize();
  })

}