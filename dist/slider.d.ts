declare type eventType = "drag-start" | "update" | "drag-end" | "resize";
export declare class SimpleSlider extends EventTarget {
    private divMain;
    private divHandle;
    private sliderWidth;
    private handleOffset;
    private divBarL;
    private divBarR;
    private active;
    private currentX;
    private initialX;
    value: number;
    valueMax: number;
    valueMin: number;
    valueStep: number;
    private handleLeftPos;
    constructor(div: string, min: number, max: number, step: number);
    private dragStart;
    private drag;
    private dragEnd;
    private setTranslate;
    private makeDivs;
    private init;
    private handleToCentre;
    resize(): void;
    setValue(val: number): void;
    addEventListener(eventName: eventType, listener: EventListener): void;
}
export {};
//# sourceMappingURL=slider.d.ts.map