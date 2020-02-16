# simple-slider
A simple slider based on vanilla HTML, CSS and JS with no dependencies.


# Example
Initialization
```javascript
const slider = new SimpleSlider("slider");
```

handle the update event
```javascript
slider.addEventListener("rel", (e) => {
  pValue.innerHTML = slider.value.toString() + "%";
});
```

Redraw the slider upon window resize
```javascript
window.addEventListener("resize", () => {
  slider.resize();
})
```

[JSfiddle Example](https://jsfiddle.net/danchitnis/sLu6rqv2/)

[CodePen Example](https://codepen.io/danchitnis/pen/ZEGYdav)

