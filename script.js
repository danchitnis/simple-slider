{
  const pValue = document.getElementById("value");

  const slider = new SimpleSlider("slider");
  console.log(slider);

  slider.addEventListener("rel", (e) => {
    pValue.innerHTML = slider.value.toString() + "%";
  });

  window.addEventListener("resize", () => {
    slider.resize();
  })

}