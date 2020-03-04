/*
 *
 */
export class SimpleSlider extends EventTarget {
    constructor(div, min, max, step) {
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
        this.valueStep = 0;
        this.handleLeftPos = 0;
        this.valueMax = max;
        this.valueMin = min;
        this.valueStep = step;
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
        /*this.divBarL.addEventListener("mousedown", e => {
          const x = e.clientX;
          this.setTranslate(x - this.handleOffset);
        });
        this.divBarR.addEventListener("mousedown", e => {
          const x = e.clientX;
          this.setTranslate(x - this.handleOffset);
        });*/
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
        this.initialX = x - this.handleLeftPos - this.handleOffset;
        this.active = true;
        this.dispatchEvent(new CustomEvent("drag-start"));
    }
    drag(e, x) {
        if (this.active) {
            e.preventDefault();
            this.currentX = x - this.initialX;
            this.translate(this.currentX);
            this.value = this.getPositionValue(this.currentX);
            this.dispatchEvent(new CustomEvent("update"));
        }
    }
    dragEnd(e) {
        this.active = false;
        this.dispatchEvent(new CustomEvent("drag-end"));
    }
    translate(xPos) {
        console.log(xPos);
        switch (true) {
            case xPos < this.pxMin: {
                xPos = this.pxMin;
            }
            case xPos > this.pxMax: {
                xPos = this.pxMax;
            }
            default: {
                //const relPos = 1000xPos / this.sliderWidth;
                const handlePos = xPos - this.handleOffset;
                //const handlePos = xPos;
                const barPos = xPos;
                this.divHandle.style.left =
                    (handlePos - this.handleOffset).toString() + "px";
                this.handleLeftPos = handlePos;
                this.divBarL.style.width = (handlePos).toString() + "px";
                this.divBarR.style.width = (this.sliderWidth - handlePos).toString() + "px";
            }
        }
    }
    getPositionValue(xPos) {
        const delta = 1;
        //const step = this.sliderWidth / 10;
        //const step = 1;
        //xPos = Math.round(xPos / step) * step;
        const innerValue = (xPos - this.pxMin) / (this.pxMax - this.pxMin);
        return (this.valueMax - this.valueMin) * innerValue + this.valueMin;
    }
    /*private setPositionValue(val: number) {
      const valRel = (val - this.valueMin) / (this.valueMax - this.valueMin);
      const newPos = valRel * this.sliderWidth;
  
      const handlePos = newPos - this.handleOffset;
      const barPos = newPos;
  
      this.divHandle.style.left = handlePos.toString() + "px";
      this.handleLeftPos = handlePos;
  
      this.divBarL.style.left = this.handleOffset.toString() + "px";
      this.divBarL.style.width =
        (barPos - this.handleOffset / 2).toString() + "px";
      this.divBarR.style.width =
        (this.sliderWidth - barPos - this.handleOffset / 2).toString() + "px";
  
      this.value = val;
    }*/
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
        this.divBarL.style.left = this.handleOffset.toString() + "px";
        this.pxMin = this.handleOffset;
        this.pxMax = this.sliderWidth - this.handleOffset;
        this.divHandle.style.left =
            (this.handleLeftPos - this.handleOffset).toString() + "px";
        this.divBarL.style.width = (this.handleLeftPos).toString() + "px";
        this.divBarR.style.width = (this.sliderWidth - this.handleLeftPos).toString() + "px";
        if (this.value == -1) {
            this.handleToCentre();
        }
        else {
            //this.setValue(this.value);
        }
    }
    handleToCentre() {
        //this.setPositionValue(50);
    }
    resize() {
        this.init();
        //this.setPositionValue(this.value);
    }
    addEventListener(eventName, listener) {
        super.addEventListener(eventName, listener);
    }
}
//# sourceMappingURL=slider.js.map