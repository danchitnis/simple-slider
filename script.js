{
  
  //const slider = document.getElementById("container");
  const pValue = document.getElementById("value");

  const slider = new SimpleSlider();
  console.log(slider);

  slider.addEventListener("rel", (e) => {
    pValue.innerHTML = slider.value.toString() + "%";
  });

}