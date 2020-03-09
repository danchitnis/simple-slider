# simple-slider

A simple slider based on vanilla HTML, CSS and JS with no dependencies.

# Example

Initialization

```javascript
const slider = new SimpleSlider("slider", 0, 100, 0);
```

handle the update event

```javascript
slider.addEventListener("update", e => {
  pValue.innerHTML = slider.value.toString() + "%";
});
```

Redraw the slider upon window resize

```javascript
window.addEventListener("resize", () => {
  slider.resize();
});
```

[JSfiddle Example](https://jsfiddle.net/danchitnis/pfevzy3h)

[CodePen Example](https://codepen.io/danchitnis/pen/ZEGYdav)

[![Edit Simple Slider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/simple-slider-bl267?fontsize=14&hidenavigation=1&theme=dark)

# API documentation

[See here 🧾](https://danchitnis.github.io/simple-slider/docs)
