/*
 *
 */

type eventType = "drag-start" | "update" | "drag-end" | "resize";

export class SimpleSlider extends EventTarget {
  private divMain: HTMLDivElement;
  private divHandle: HTMLDivElement;

  private sliderWidth = 0;
  private handleOffset = 0;
  private pxMin = 0;
  private pxMax = 0;

  private divBarL: HTMLDivElement;
  private divBarR: HTMLDivElement;

  private active = false;
  private currentX = 0;
  private initialX = 0;

  public value = -1;
  public valueMax = 100;
  public valueMin = 0;
  public valueStep = 0;

  private handlePos = 0;

  constructor(div: string, min: number, max: number, step: number) {
    super();
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

  private dragStart(x: number): void {
    this.initialX = x - this.handlePos - this.handleOffset;

    this.active = true;

    this.dispatchEvent(new CustomEvent("drag-start"));
  }

  private drag(e: Event, x: number): void {
    if (this.active) {
      e.preventDefault();

      this.currentX = x - this.initialX;
      this.translate(this.currentX);
      this.value = this.getPositionValue(this.handlePos);

      this.dispatchEvent(new CustomEvent("update"));
    }
  }

  private dragEnd(e: Event): void {
    this.active = false;
    this.dispatchEvent(new CustomEvent("drag-end"));
  }

  private translate(xPos: number): void {
    //console.log(xPos);

    let handlePos = xPos - this.handleOffset;
    //const handlePos = xPos;

    switch (true) {
      case handlePos < this.pxMin: {
        handlePos = this.pxMin;
        console.log("😯");
        break;
      }
      case handlePos > this.pxMax: {
        handlePos = this.pxMax;
        break;
      }
      default:
        {
          //const relPos = 1000xPos / this.sliderWidth;
        }

        this.divHandle.style.left =
          (handlePos - this.handleOffset).toString() + "px";
        this.handlePos = handlePos;

        this.divBarL.style.width =
          (handlePos - this.handleOffset).toString() + "px";
      //this.divBarR.style.width =
      //  (this.sliderWidth - handlePos).toString() + "px";
    }
  }

  private getPositionValue(xPos: number): number {
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

  private makeDivs(mainDiv: string): void {
    this.divMain = document.getElementById(mainDiv) as HTMLDivElement;
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

  private init(): void {
    const divMainWidth = parseFloat(
      getComputedStyle(this.divMain).getPropertyValue("width")
    );
    const handleWidth = parseFloat(
      getComputedStyle(this.divHandle).getPropertyValue("width")
    );
    const handlePad = parseFloat(
      getComputedStyle(this.divHandle).getPropertyValue("border-left-width")
    );
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

    this.pxMin = parseFloat(getComputedStyle(this.divBarL).left);
    this.pxMax = this.pxMin + this.sliderWidth;
    console.log("pxmin=", this.pxMax);

    if (this.value == -1) {
      this.handleToCentre();
    } else {
      //this.setValue(this.value);
    }
  }

  private handleToCentre(): void {
    //this.setPositionValue(50);
  }

  public resize(): void {
    this.init();
    //this.setPositionValue(this.value);
  }

  public addEventListener(eventName: eventType, listener: EventListener): void {
    super.addEventListener(eventName, listener);
  }
}
