{
    const container = document.getElementById("container");
    let divHandle;
    let handleWidth = 0;
    let sliderWidth = 0;
    let divBarL;
    let divBarR;
    const pValue = document.getElementById("value");
    let active = false;
    let currentX = 0;
    let initialX = 0;
    makeDivs();
    handleToCentre();
    //container.addEventListener("touchstart", dragStart, false);
    //container.addEventListener("touchend", dragEnd, false);
    //container.addEventListener("touchmove", drag, false);
    divHandle.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mousemove", drag, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mouseleave", dragEnd);
    function dragStart(e) {
        init();
        //initialX = e.touches[0].clientX - xOffset;
        //initialY = e.touches[0].clientY - yOffset;
        initialX = e.clientX - parseFloat(getComputedStyle(divHandle).left) - handleWidth / 2;
        console.log(initialX);
        active = true;
    }
    function drag(e) {
        if (active) {
            e.preventDefault();
            //currentX = e.touches[0].clientX - initialX;
            //currentY = e.touches[0].clientY - initialY;
            currentX = e.clientX - initialX;
            setTranslate(currentX);
            //console.log(e.clientX, e.clientY);
        }
    }
    function dragEnd(e) {
        active = false;
    }
    function setTranslate(xPos) {
        const handlePos = 100 * (xPos - handleWidth / 2) / (sliderWidth);
        const barPos = 100 * (xPos) / (sliderWidth);
        divHandle.style.left = handlePos.toString() + "%";
        divBarL.style.width = barPos.toString() + "%";
        divBarR.style.width = (100 - barPos).toString() + "%";
        pValue.innerHTML = `${barPos.toFixed(2)}%`;
        //divHandle.style.left = `${95}%`;
    }
    function makeDivs() {
        divHandle = document.createElement("div");
        divHandle.id = "handle";
        divBarL = document.createElement("div");
        divBarL.id = "barL";
        divBarR = document.createElement("div");
        divBarR.id = "barR";
        container.append(divHandle);
        container.append(divBarL);
        container.append(divBarR);
    }
    function init() {
        const style = getComputedStyle(container);
        sliderWidth = parseFloat(style.width);
        handleWidth = parseFloat(getComputedStyle(divHandle).width);
    }
    function handleToCentre() {
        init();
        const handlePos = 50 - (100 * 0.5 * handleWidth / sliderWidth);
        //const handlePos = 0;
        divHandle.style.left = handlePos.toString() + "%";
    }
}
//# sourceMappingURL=slider.js.map