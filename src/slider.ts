class SimpleSlider extends EventTarget {
    
    private container : HTMLDivElement;
    private divHandle: HTMLDivElement;
    private handleWidth = 0;
    private sliderWidth = 0;

    private divBarL: HTMLDivElement;
    private divBarR: HTMLDivElement;

    private active = false;
    private currentX = 0;
    private initialX = 0;

    public value = 0;


    constructor() {
        super();

        this.makeDivs();
        this.handleToCentre();

        //this.divHandle.addEventListener("mousedown", this.dragStart, false);
        this.divHandle.addEventListener("mousedown", (e)=> {
            this.dragStart(e);
        });
        this.container.addEventListener("mousemove", (e) => {
            this.drag(e);
        });
        this.container.addEventListener("mouseup", (e) => {
            this.dragEnd(e);
        });
        this.container.addEventListener("mouseleave", (e) => {
            this.dragEnd(e);
        });
    }

    

    

    //container.addEventListener("touchstart", dragStart, false);
    //container.addEventListener("touchend", dragEnd, false);
    //container.addEventListener("touchmove", drag, false);

    
    

    

    private dragStart(e: MouseEvent) {
        //SimpleSlider.init();
        //initialX = e.touches[0].clientX - xOffset;
        //initialY = e.touches[0].clientY - yOffset;

        this.initialX = e.clientX - parseFloat( getComputedStyle(this.divHandle).left ) - this.handleWidth / 2;

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
      
        const handlePos = 100 * (xPos - this.handleWidth/2) / (this.sliderWidth);
        const barPos = 100 * (xPos) / (this.sliderWidth);
        this.divHandle.style.left = handlePos.toString() + "%";
        
        this.divBarL.style.width = barPos.toString() + "%";
        this.divBarR.style.width = (100 - barPos).toString() + "%";

        this.value = barPos;

        //divHandle.style.left = `${95}%`;
      
    }

    private makeDivs() {
        this.container = document.getElementById("container") as HTMLDivElement;
        console.log("👱‍♂️");
        
        this.divHandle = document.createElement("div");
        this.divHandle.id = "handle";
        this.divBarL = document.createElement("div");
        this.divBarL.id = "barL"
        this.divBarR = document.createElement("div");
        this.divBarR.id = "barR";

        this.container.append(this.divHandle);
        this.container.append(this.divBarL);
        this.container.append(this.divBarR);

    }

    private init() {
        const style = getComputedStyle(this.container)
        this.sliderWidth = parseFloat(style.width);
        this.handleWidth = parseFloat( getComputedStyle(this.divHandle).width );
    }

    private handleToCentre() {
        this.init();

        const handlePos = 50 - (100*0.5*this.handleWidth/this.sliderWidth);
        //const handlePos = 0;
        this.divHandle.style.left = handlePos.toString() + "%";
    }


}