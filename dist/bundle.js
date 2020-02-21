var SimpleSlider = (function (exports) {
    'use strict';

    /*
     *
     */
    class SimpleSlider extends EventTarget {
        constructor(div, min, max, step) {
            super();
            this.sliderWidth = 0;
            this.handleOffset = 0;
            this.active = false;
            this.currentX = 0;
            this.initialX = 0;
            this.value = 0;
            this.valueMax = 100;
            this.valueMin = 0;
            this.valueStep = 0;
            this.handleLeftPos = 0;
            this.valueMax = max;
            this.valueMin = min;
            this.valueStep = step;
            this.makeDivs(div);
            this.init();
            this.handleToCentre();
            this.divHandle.addEventListener("mousedown", (e) => {
                const x = e.clientX;
                this.dragStart(x);
            });
            this.divMain.addEventListener("mousemove", (e) => {
                const x = e.clientX;
                this.drag(e, x);
            });
            this.divMain.addEventListener("mouseup", (e) => {
                this.dragEnd(e);
            });
            this.divMain.addEventListener("mouseleave", (e) => {
                this.dragEnd(e);
            });
            this.divBarL.addEventListener("mousedown", (e) => {
                const x = e.clientX;
                this.setTranslate(x - this.handleOffset);
            });
            this.divBarR.addEventListener("mousedown", (e) => {
                const x = e.clientX;
                this.setTranslate(x - this.handleOffset);
            });
            this.divHandle.addEventListener("touchstart", (e) => {
                const x = e.touches[0].clientX;
                this.dragStart(x);
            });
            this.divMain.addEventListener("touchmove", (e) => {
                const x = e.touches[0].clientX;
                this.drag(e, x);
            });
            this.divMain.addEventListener("touchend", (e) => {
                this.dragEnd(e);
            });
        }
        dragStart(x) {
            this.initialX = x - this.handleLeftPos - this.handleOffset / 2;
            this.active = true;
            this.dispatchEvent(new CustomEvent('drag-start'));
        }
        drag(e, x) {
            if (this.active) {
                e.preventDefault();
                this.currentX = x - this.initialX;
                this.setTranslate(this.currentX);
            }
        }
        dragEnd(e) {
            this.active = false;
            this.dispatchEvent(new CustomEvent('drag-end'));
        }
        setTranslate(xPos) {
            const pxMin = this.handleOffset;
            const pxMax = this.sliderWidth - this.handleOffset;
            if (xPos > pxMin && xPos < pxMax) {
                const handlePos = xPos - this.handleOffset;
                const barPos = xPos;
                this.divHandle.style.left = handlePos.toString() + "px";
                this.handleLeftPos = handlePos;
                this.divBarL.style.left = this.handleOffset.toString() + "px";
                this.divBarL.style.width = (barPos - this.handleOffset / 2).toString() + "px";
                this.divBarR.style.width = (this.sliderWidth - barPos - this.handleOffset / 2).toString() + "px";
                const innerValue = (barPos - pxMin) / (pxMax - pxMin);
                this.value = (this.valueMax - this.valueMin) * innerValue + this.valueMin;
                this.dispatchEvent(new CustomEvent("update"));
            }
        }
        makeDivs(mainDiv) {
            this.divMain = document.getElementById(mainDiv);
            this.divMain.className = "simple-slider";
            this.divHandle = document.createElement("div");
            this.divHandle.id = "handle";
            this.divHandle.className = "simple-slider-handle";
            this.divBarL = document.createElement("div");
            this.divBarL.id = "barL";
            this.divBarL.className = "simple-slider-barL";
            this.divBarR = document.createElement("div");
            this.divBarR.id = "barR";
            this.divBarR.className = "simple-slider-barR";
            this.divMain.append(this.divHandle);
            this.divMain.append(this.divBarL);
            this.divMain.append(this.divBarR);
        }
        init() {
            this.sliderWidth = parseFloat(getComputedStyle(this.divMain).getPropertyValue("width"));
            const handleWidth = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("width"));
            const handlePad = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("border-left-width"));
            this.handleOffset = (handleWidth + handlePad) / 2;
            this.handleLeftPos = parseFloat(getComputedStyle(this.divHandle).left);
            this.setTranslate(0.5 * this.sliderWidth);
        }
        handleToCentre() {
            this.setTranslate(this.sliderWidth / 2);
        }
        resize() {
            this.init();
            const newPos = this.value * 0.01 * this.sliderWidth;
            this.setTranslate(newPos);
        }
        setValue(val) {
            const valRel = (val - this.valueMin) / (this.valueMax - this.valueMin);
            const newPos = valRel * this.sliderWidth;
            this.setTranslate(newPos);
        }
        addEventListener(eventName, listener) {
            super.addEventListener(eventName, listener);
        }
    }

    exports.SimpleSlider = SimpleSlider;

    return exports;

}({}));