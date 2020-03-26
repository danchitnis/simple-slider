# simple-slider

A simple range slider based on vanilla HTML, CSS and JS with no dependencies. Features include:

- Cross-browser compatibility using vanilla Javascript and CSS
- Simple constructor and developer friendly
- Single file library with no dependency, written in Typescript and compatible with ES6
- Can be bundled with modern tools such as [RollupJS](https://rollupjs.org/)
- Touch enabled for touchscreen devices
- Responsive to real-time layout change

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

# Webkit (i.e. Safari & iPhone)

Add the following polyfill before your script to have support for Webkit. This also includes Chrome on iPhone since it is based on Webkit.

```html
<script src="https://unpkg.com/@ungap/event-target"></script>
```

This [package](https://github.com/ungap/event-target) will automatically detect if Event-Target is present in the browser.

# API documentation

[See here 🧾](https://danchitnis.github.io/simple-slider/docs)

# Contributions

inspired by [noUiSlider](https://github.com/leongersen/noUiSlider/)
