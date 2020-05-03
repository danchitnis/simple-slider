/**
 * Simple Slide
 *
 * by Danial Chitnis
 * Feb 2020
 */
declare type eventType = "drag-start" | "update" | "drag-end" | "resize";
export declare class SimpleSlider extends EventTarget {
    private divMain;
    private divHandle;
    private sliderWidth;
    private handleOffset;
    private pxMin;
    private pxMax;
    private divBarL;
    private divBarR;
    private active;
    private currentX;
    private initialX;
    private handlePos;
    private enable;
    /**
     * Current value of the slider
     * @default half of the value range
     */
    value: number;
    /**
     * maximum value
     * @default 100
     */
    valueMax: number;
    /**
     * minimum value for the slider
     * @default 0
     */
    valueMin: number;
    /**
     * number of divisions in the value range
     * @default 0
     */
    valueN: number;
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
    constructor(div: string, min: number, max: number, n: number);
    private dragStart;
    private drag;
    private dragEnd;
    private translateN;
    private translate;
    private getPositionValue;
    /**
     * Sets the value of the slider on demand
     * @param val - the value of the slider
     */
    setValue(val: number): void;
    private init;
    private handleToCentre;
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
    resize(): void;
    /**
     * Change the state of the slider
     * @param state enable state of the slider
     */
    setEnable(state: boolean): void;
    /**
     * Sets the status of the debug mode
     * @param en - enable value true/false
     */
    setDebug(en: boolean): void;
    /**
     *
     * @param eventName
     * @param listener
     */
    addEventListener(eventName: eventType, listener: EventListener): void;
    private makeDivs;
}
export {};
//# sourceMappingURL=slider.d.ts.map