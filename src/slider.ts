class SimpleSlider extends EventTarget {
    
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


    constructor(div: string) {
        super();

        this.makeDivs(div);
        this.handleToCentre();

        //this.divHandle.addEventListener("mousedown", this.dragStart, false);
        this.divHandle.addEventListener("mousedown", (e)=> {
            this.dragStart(e);
        });
        this.divMain.addEventListener("mousemove", (e) => {
            this.drag(e);
        });
        this.divMain.addEventListener("mouseup", (e) => {
            this.dragEnd(e);
        });
        this.divMain.addEventListener("mouseleave", (e) => {
            this.dragEnd(e);
        });
    }

    

    

    //divMain.addEventListener("touchstart", dragStart, false);
    //divMain.addEventListener("touchend", dragEnd, false);
    //divMain.addEventListener("touchmove", drag, false);

    
    

    

    private dragStart(e: MouseEvent) {
        //SimpleSlider.init();
        //initialX = e.touches[0].clientX - xOffset;
        //initialY = e.touches[0].clientY - yOffset;

        this.initialX = e.clientX - parseFloat( getComputedStyle(this.divHandle).left ) - this.handleOffset / 2;

        this.active = true;

    }

    private drag(e: MouseEvent) {
        if (this.active) {
        
            e.preventDefault();
            
            //currentX = e.touches[0].clientX - initialX;
            //currentY = e.touches[0].clientY - initialY;

            this.currentX = e.clientX - this.initialX;

            this.setTranslate(this.currentX);
            //console.log(e.clientX, e.clientY);
        
        }
    }

    private dragEnd(e: MouseEvent) {

        this.active = false;
        this.dispatchEvent(new CustomEvent('rel', { detail: 10 }));
    }

    

    private setTranslate(xPos: number) {
      
        const handlePos = xPos - this.handleOffset;
        const barPos = xPos;
        this.divHandle.style.left = handlePos.toString() + "px";
        
        //this.divBarL.style.width = barPos.toString() + "%";
        this.divBarL.style.width = (barPos).toString() + "px";
        this.divBarR.style.width = (this.sliderWidth - barPos).toString() + "px";

        this.value = 100 * barPos / this.sliderWidth;

        //divHandle.style.left = `${95}%`;
      
    }

    private makeDivs(mainDiv: string) {
        this.divMain = document.getElementById(mainDiv) as HTMLDivElement;
        this.divMain.className = "simple-slider";
        console.log("👱‍♂️");
        
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
    }

    private handleToCentre() {
        this.init();

        const handlePos = 50 - (100 * this.handleOffset/this.sliderWidth);
        //const handlePos = 0;
        this.divHandle.style.left = handlePos.toString() + "%";
    }

    public resize() {
        this.init();
        const newPos = this.value*0.01 * this.sliderWidth;
        this.setTranslate(newPos)
    }


}