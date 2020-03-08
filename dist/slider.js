/**
 * Simple Slide
 *
 * by Danial Chitnis
 * Feb 2020
 */
export class SimpleSlider extends EventTarget {
    constructor(div, min, max, n) {
        super();
        this.sliderWidth = 0;
        this.handleOffset = 0;
        this.pxMin = 0;
        this.pxMax = 0;
        this.active = false;
        this.currentX = 0;
        this.initialX = 0;
        this.value = -1;
        this.valueMax = 100;
        this.valueMin = 0;
        this.valueN = 0;
        this.handlePos = 0;
        this.valueMax = max;
        this.valueMin = min;
        this.valueN = n;
        this.makeDivs(div);
        this.init();
        this.handleToCentre();
        this.divHandle.addEventListener("mousedown", e => {
            const x = e.clientX;
            this.dragStart(x);
        });
        this.divMain.addEventListener("mousemove", e => {
            const x = e.clientX;
            this.drag(e, x);
        });
        this.divMain.addEventListener("mouseup", e => {
            this.dragEnd(e);
        });
        this.divMain.addEventListener("mouseleave", e => {
            this.dragEnd(e);
        });
        this.divBarL.addEventListener("mousedown", e => {
            const x = e.clientX;
            this.translate2(x);
        });
        this.divBarR.addEventListener("mousedown", e => {
            const x = e.clientX;
            this.translate2(x);
        });
        this.divHandle.addEventListener("touchstart", e => {
            const x = e.touches[0].clientX;
            this.dragStart(x);
        });
        this.divMain.addEventListener("touchmove", e => {
            const x = e.touches[0].clientX;
            this.drag(e, x);
        });
        this.divMain.addEventListener("touchend", e => {
            this.dragEnd(e);
        });
    }
    dragStart(x) {
        this.initialX = x - this.handlePos - this.handleOffset;
        this.active = true;
        this.dispatchEvent(new CustomEvent("drag-start"));
    }
    drag(e, x) {
        if (this.active) {
            e.preventDefault();
            this.currentX = x - this.initialX;
            this.translate2(this.currentX);
            this.value = this.getPositionValue();
            this.dispatchEvent(new CustomEvent("update"));
        }
    }
    dragEnd(e) {
        this.active = false;
        this.dispatchEvent(new CustomEvent("drag-end"));
    }
    /*-----------------------------------------------------------*/
    translate2(xPos) {
        this.translate(xPos);
        if (this.valueN > 0) {
            let val = this.getPositionValue();
            const step = (this.valueMax - this.valueMin) / this.valueN;
            val = Math.round(val / step) * step;
            this.setPositionValue(val);
        }
    }
    translate(xPos) {
        //console.log(xPos);
        this.handlePos = xPos - this.handleOffset;
        //const handlePos = xPos;
        switch (true) {
            case this.handlePos < this.pxMin: {
                this.handlePos = this.pxMin;
                console.log("😯");
                break;
            }
            case this.handlePos > this.pxMax: {
                this.handlePos = this.pxMax;
                break;
            }
            default:
                {
                    //const relPos = 1000xPos / this.sliderWidth;
                }
                this.divHandle.style.left =
                    (this.handlePos - this.handleOffset).toString() + "px";
                //this.handlePos = handlePos;
                this.divBarL.style.width =
                    (this.handlePos - this.handleOffset).toString() + "px";
            //this.divBarR.style.width =
            //  (this.sliderWidth - handlePos).toString() + "px";
        }
    }
    getPositionValue() {
        //const step = this.sliderWidth / 10;
        //const step = 1;
        //this.handlePos = Math.round(this.handlePos / step) * step;
        const innerValue = (this.handlePos - this.pxMin) / this.sliderWidth;
        return (this.valueMax - this.valueMin) * innerValue + this.valueMin;
    }
    setPositionValue(val) {
        const valRel = (val - this.valueMin) / (this.valueMax - this.valueMin);
        const newPos = valRel * this.sliderWidth + 2 * this.handleOffset;
        //const handlePos = newPos - this.handleOffset;
        //const barPos = newPos;
        this.translate(newPos);
        this.value = this.getPositionValue();
        this.dispatchEvent(new CustomEvent("update"));
    }
    init() {
        const divMainWidth = parseFloat(getComputedStyle(this.divMain).getPropertyValue("width"));
        const handleWidth = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("width"));
        const handlePad = parseFloat(getComputedStyle(this.divHandle).getPropertyValue("border-left-width"));
        this.handleOffset = handleWidth / 2 + handlePad;
        this.handlePos =
            parseFloat(getComputedStyle(this.divHandle).left) + this.handleOffset;
        this.divBarL.style.left = this.handleOffset.toString() + "px";
        this.divBarR.style.left = this.handleOffset.toString() + "px";
        this.sliderWidth = divMainWidth - 2 * this.handleOffset;
        //this.divHandle.style.left =
        //  (this.handlePos - this.handleOffset).toString() + "px";
        this.divBarL.style.width =
            (this.handlePos - this.handleOffset).toString() + "px";
        this.divBarR.style.width = this.sliderWidth.toString() + "px";
        this.pxMin = this.handleOffset;
        this.pxMax = this.pxMin + this.sliderWidth;
        if (this.value == -1) {
            this.handleToCentre();
        }
        else {
            this.setPositionValue(this.value);
        }
    }
    handleToCentre() {
        this.setPositionValue(50);
    }
    resize() {
        this.init();
        this.setPositionValue(this.value);
    }
    addEventListener(eventName, listener) {
        super.addEventListener(eventName, listener);
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
}
//# sourceMappingURL=slider.js.map