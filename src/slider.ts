/*
 * 
 */


type eventType = "drag-start" | "update" | "drag-end" | "resize";

export class SimpleSlider extends EventTarget {
    
    private divMain : HTMLDivElement;
    private divHandle: HTMLDivElement;
    
    private sliderWidth = 0;
    private handleOffset = 0;

    private divBarL: HTMLDivElement;
    private divBarR: HTMLDivElement;

    private active = false;
    private currentX = 0;
    private initialX = 0;

    public value = 0;
    public valueMax = 100;
    public valueMin = 0;
    public valueStep = 0;

    private handleLeftPos = 0;


    constructor(div: string, min:number, max:number, step:number) {
        super();
        this.valueMax = max;
        this.valueMin = min;
        this.valueStep = step;

        this.makeDivs(div);
        this.init();
        this.handleToCentre();

        
        this.divHandle.addEventListener("mousedown", (e)=> {
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
            this.setTranslate(x -this.handleOffset);
        });
        this.divBarR.addEventListener("mousedown", (e) => {
            const x = e.clientX;
            this.setTranslate(x -this.handleOffset);
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

    private dragStart(x: number) {

        this.initialX = x - this.handleLeftPos - this.handleOffset / 2;

        this.active = true;

        this.dispatchEvent(new CustomEvent('drag-start'));

    }

    private drag(e: Event, x:number) {
        if (this.active) {
        
            e.preventDefault();

            this.currentX = x - this.initialX;
            this.setTranslate(this.currentX);
        
        }
    }

    private dragEnd(e: Event) {

        this.active = false;
        this.dispatchEvent(new CustomEvent('drag-end'));
    }

    

    private setTranslate(xPos: number) {
        const pxMin = this.handleOffset;
        const pxMax = this.sliderWidth-this.handleOffset;

        if ( xPos > pxMin && xPos < pxMax ) {
            const handlePos = xPos - this.handleOffset;
            const barPos = xPos;
            
            this.divHandle.style.left = handlePos.toString() + "px";
            this.handleLeftPos = handlePos;
            
            this.divBarL.style.left = this.handleOffset.toString() + "px";
            this.divBarL.style.width = (barPos - this.handleOffset/2).toString() + "px";
            this.divBarR.style.width = (this.sliderWidth - barPos - this.handleOffset/2).toString() + "px";

            const innerValue = (barPos-pxMin) / (pxMax - pxMin);

            this.value =  (this.valueMax - this.valueMin) * innerValue + this.valueMin;

            this.dispatchEvent(new CustomEvent("update"));
        }
 
    }

    private makeDivs(mainDiv: string) {
        this.divMain = document.getElementById(mainDiv) as HTMLDivElement;
        this.divMain.className = "simple-slider";
        
        this.divHandle = document.createElement("div");
        this.divHandle.id = "handle";
        this.divHandle.className = "simple-slider-handle";

        this.divBarL = document.createElement("div");
        this.divBarL.id = "barL"
        this.divBarL.className = "simple-slider-barL";

        this.divBarR = document.createElement("div");
        this.divBarR.id = "barR";
        this.divBarR.className = "simple-slider-barR";

        this.divMain.append(this.divHandle);
        this.divMain.append(this.divBarL);
        this.divMain.append(this.divBarR);

    }

    private init() {
        this.sliderWidth = parseFloat ( getComputedStyle(this.divMain).getPropertyValue("width") );
        const handleWidth = parseFloat( getComputedStyle(this.divHandle).getPropertyValue("width") );
        const handlePad = parseFloat( getComputedStyle(this.divHandle).getPropertyValue("border-left-width") );
        this.handleOffset = (handleWidth + handlePad) / 2;
        
        this.handleLeftPos = parseFloat( getComputedStyle(this.divHandle).left );

        this.setTranslate(0.5 * this.sliderWidth);

        
    }

    private handleToCentre() {
        this.setTranslate(this.sliderWidth/2);
    }

    public resize() {
        this.init();
        const newPos = this.value*0.01 * this.sliderWidth;
        this.setTranslate(newPos)
    }

    public setValue(val: number) {
        const valRel= (val - this.valueMin) / (this.valueMax - this.valueMin);
        const newPos = valRel * this.sliderWidth;
        this.setTranslate(newPos);
    }

    public addEventListener(eventName: eventType, listener: EventListener) {
        super.addEventListener(eventName, listener);
    }


}