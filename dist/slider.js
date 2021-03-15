/**
 * Simple Slide
 *
 * by Danial Chitnis
 * Feb 2020
 */
class SimpleSlider {
    /**
     *
     * @param div - The id of the div which the slider is going to be placed
     * @param min - The minimum value for the slider
     * @param max - The maximum value for the slider
     * @param n - number of divisions within the value range, 0 for continuos
     *
     * @example
     * ```javascript
     * slider = new SimpleSlider("slider", 0, 100, 0);
     * ```
     */
    constructor(div, min, max, n) {
        this.sliderWidth = 0;
        this.handleOffset = 0;
        this.pxMin = 0;
        this.pxMax = 0;
        this.active = false;
        this.currentX = 0;
        this.initialX = 0;
        this.handlePos = 0;
        this.enable = true;
        /**
         * Current value of the slider
         * @default half of the value range
         */
        this.value = -1;
        /**
         * maximum value
         * @default 100
         */
        this.valueMax = 100;
        /**
         * minimum value for the slider
         * @default 0
         */
        this.valueMin = 0;
        /**
         * number of divisions in the value range
         * @default 0
         */
        this.valueN = 0;
        this.valueMax = max;
        this.valueMin = min;
        this.valueN = n;
        this.makeDivs(div);
        this.init();
        this.handleToCentre();
        this.divHandle.addEventListener("mousedown", (e) => {
            const x = e.clientX;
            if (this.enable) {
                this.dragStart(x);
            }
        });
        this.divMain.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            this.drag(e, x);
        });
        this.divMain.addEventListener("mouseup", () => {
            this.dragEnd();
        });
        this.divMain.addEventListener("mouseleave", () => {
            if (this.active) {
                this.dragEnd();
            }
        });
        this.divBarL.addEventListener("mousedown", (e) => {
            if (this.enable) {
                const x = e.clientX;
                this.translateN(x);
            }
        });
        this.divBarR.addEventListener("mousedown", (e) => {
            if (this.enable) {
                const x = e.clientX;
                this.translateN(x);
            }
        });
        this.divHandle.addEventListener("touchstart", (e) => {
            const x = e.touches[0].clientX;
            this.dragStart(x);
        });
        this.divMain.addEventListener("touchmove", (e) => {
            const x = e.touches[0].clientX;
            this.drag(e, x);
        });
        this.divMain.addEventListener("touchend", () => {
            this.dragEnd();
        });
    }
    dragStart(x) {
        this.initialX = x - this.handlePos - this.handleOffset;
        this.active = true;
        this.callbackDragStart();
    }
    drag(e, x) {
        if (this.active) {
            e.preventDefault();
            this.currentX = x - this.initialX;
            this.translateN(this.currentX);
            this.value = this.getPositionValue();
            this.callBackUpdate();
        }
    }
    dragEnd() {
        this.active = false;
        this.callBackDragEnd();
    }
    /*-----------------------------------------------------------*/
    translateN(xPos) {
        this.translate(xPos);
        if (this.valueN > 0) {
            let val = this.getPositionValue();
            const step = (this.valueMax - this.valueMin) / (this.valueN - 1);
            val = Math.round(val / step) * step;
            this.setValue(val);
        }
    }
    translate(xPos) {
        this.handlePos = xPos - this.handleOffset;
        switch (true) {
            case this.handlePos < this.pxMin: {
                this.handlePos = this.pxMin;
                break;
            }
            case this.handlePos > this.pxMax: {
                this.handlePos = this.pxMax;
                break;
            }
            default: {
                this.divHandle.style.left = (this.handlePos - this.handleOffset).toString() + "px";
                this.divBarL.style.width = (this.handlePos - this.handleOffset).toString() + "px";
            }
        }
    }
    getPositionValue() {
        const innerValue = (this.handlePos - this.pxMin) / this.sliderWidth;
        return (this.valueMax - this.valueMin) * innerValue + this.valueMin;
    }
    /**
     * Sets the value of the slider on demand
     * @param val - the value of the slider
     */
    setValue(val) {
        const valRel = (val - this.valueMin) / (this.valueMax - this.valueMin);
        const newPos = valRel * this.sliderWidth + 2 * this.handleOffset;
        this.translate(newPos);
        this.value = this.getPositionValue();
        this.callBackUpdate();
    }
    init() {
        const divMainWidth = parseFloat(getComputedStyle(this.divMain).getPropertyValue("width"));
        const handleWidth = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("width"));
        const handlePad = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("border-left-width"));
        this.handleOffset = handleWidth / 2 + handlePad;
        this.handlePos = parseFloat(getComputedStyle(this.divHandle).left) + this.handleOffset;
        this.divBarL.style.left = this.handleOffset.toString() + "px";
        this.divBarR.style.left = this.handleOffset.toString() + "px";
        this.sliderWidth = divMainWidth - 2 * this.handleOffset;
        this.divBarL.style.width = (this.handlePos - this.handleOffset).toString() + "px";
        this.divBarR.style.width = this.sliderWidth.toString() + "px";
        this.pxMin = this.handleOffset;
        this.pxMax = this.pxMin + this.sliderWidth;
        if (this.value == -1) {
            this.handleToCentre();
        }
        else {
            this.setValue(this.value);
        }
    }
    handleToCentre() {
        const centre = (this.valueMax - this.valueMin) / 2 + this.valueMin;
        this.setValue(centre);
    }
    /**
     * Resize the slider
     *
     * @example
     * ```javascript
     *  window.addEventListener("resize", () => {
     *    slider.resize();
     *  });
     * ```
     */
    resize() {
        this.init();
        this.setValue(this.value);
    }
    /**
     * Change the state of the slider
     * @param state enable state of the slider
     */
    setEnable(state) {
        this.enable = state;
        if (this.enable) {
            this.divHandle.style.backgroundColor = "darkslategrey";
            this.divBarL.style.backgroundColor = "lightskyblue";
            this.divBarR.style.backgroundColor = "lightgray";
        }
        else {
            this.divHandle.style.backgroundColor = "lightgray";
            this.divBarL.style.backgroundColor = "gray";
            this.divBarR.style.backgroundColor = "gray";
        }
    }
    /**
     * Sets the status of the debug mode
     * @param en - enable value true/false
     */
    setDebug(en) {
        if (en) {
            this.divHandle.style.zIndex = "0";
            this.divMain.style.border = "solid red 1px";
        }
        else {
            this.divHandle.style.zIndex = "2";
            this.divMain.style.border = "none";
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
    callBackUpdate() { }
    callbackDragStart() { }
    callBackDragEnd() { }
}

export { SimpleSlider };
