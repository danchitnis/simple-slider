/**
 * Simple Slide
 *
 * by Danial Chitnis
 * Feb 2020
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

  private handlePos = 0;

  /**
   * Current value of the slider
   * @default half of the value range
   */
  public value = -1;

  /**
   * maximum value
   * @default 100
   */
  public valueMax = 100;

  /**
   * minimum value for the slider
   * @default 0
   */
  public valueMin = 0;

  /**
   * number of divisions in the value range
   * @default 0
   */
  public valueN = 0;

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
  constructor(div: string, min: number, max: number, n: number) {
    super();
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
    this.divMain.addEventListener("mouseup", () => {
      this.dragEnd();
    });
    this.divMain.addEventListener("mouseleave", () => {
      this.dragEnd();
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
    this.divMain.addEventListener("touchend", () => {
      this.dragEnd();
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
      this.translate2(this.currentX);
      this.value = this.getPositionValue();

      this.dispatchEvent(new CustomEvent("update"));
    }
  }

  private dragEnd(): void {
    this.active = false;
    this.dispatchEvent(new CustomEvent("drag-end"));
  }

  /*-----------------------------------------------------------*/

  private translate2(xPos: number): void {
    this.translate(xPos);
    if (this.valueN > 0) {
      let val = this.getPositionValue();
      const step = (this.valueMax - this.valueMin) / (this.valueN - 1);
      val = Math.round(val / step) * step;
      this.setValue(val);
    }
  }

  private translate(xPos: number): void {
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
        this.divHandle.style.left =
          (this.handlePos - this.handleOffset).toString() + "px";

        this.divBarL.style.width =
          (this.handlePos - this.handleOffset).toString() + "px";
      }
    }
  }

  private getPositionValue(): number {
    const innerValue = (this.handlePos - this.pxMin) / this.sliderWidth;
    return (this.valueMax - this.valueMin) * innerValue + this.valueMin;
  }

  /**
   * Sets the value of the slider on demand
   * @param val - the value of the slider
   */
  public setValue(val: number): void {
    const valRel = (val - this.valueMin) / (this.valueMax - this.valueMin);
    const newPos = valRel * this.sliderWidth + 2 * this.handleOffset;

    this.translate(newPos);

    this.value = this.getPositionValue();

    this.dispatchEvent(new CustomEvent("update"));
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

    this.divBarL.style.width =
      (this.handlePos - this.handleOffset).toString() + "px";
    this.divBarR.style.width = this.sliderWidth.toString() + "px";

    this.pxMin = this.handleOffset;
    this.pxMax = this.pxMin + this.sliderWidth;

    if (this.value == -1) {
      this.handleToCentre();
    } else {
      this.setValue(this.value);
    }
  }

  private handleToCentre(): void {
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
  public resize(): void {
    this.init();
    this.setValue(this.value);
  }

  /**
   * Sets the status of the debug mode
   * @param en - enable value true/false
   */
  public setDebug(en: boolean): void {
    if (en) {
      this.divHandle.style.zIndex = "0";
      this.divMain.style.border = "solid red 1px";
    } else {
      this.divHandle.style.zIndex = "2";
      this.divMain.style.border = "none";
    }
  }

  /**
   *
   * @param eventName
   * @param listener
   */
  public addEventListener(eventName: eventType, listener: EventListener): void {
    super.addEventListener(eventName, listener);
  }

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
}
