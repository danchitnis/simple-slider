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
    value: number;
    valueMax: number;
    valueMin: number;
    valueStep: number;
    private handlePos;
    constructor(div: string, min: number, max: number, step: number);
    private dragStart;
    private drag;
    private dragEnd;
    private translate;
    private getPositionValue;
    setPositionValue(val: number): void;
    private init;
    private handleToCentre;
    resize(): void;
    addEventListener(eventName: eventType, listener: EventListener): void;
    private makeDivs;
}
export {};
//# sourceMappingURL=slider.d.ts.map