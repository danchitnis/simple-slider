{
    const handle = document.getElementById("handle");
    const container = document.getElementById("container");
    const barL = document.getElementById("barL");
    const barR = document.getElementById("barR");

    const pValue = document.getElementById("value");

    let active = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    const style = getComputedStyle(container)
    width = parseFloat(style.width);
    xOffset = width / 2;
    const handleWidth = parseFloat( getComputedStyle(handle).width );
    console.log(handleWidth)

    console.log(style.width)

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    handle.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
      active = true;

      //console.log(initialX, initialY);

    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      console.log(currentX, currentY);

      active = false;
    }

    function drag(e) {
      if (active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          //currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, handle);
        
      }
    }

    function setTranslate(xPos, yPos, el) {
      //el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
      
      
      handlePos = 100 * (xPos - handleWidth/2) / (width);
      barPos = 100 * xPos / (width);
      el.style.left = handlePos.toString() + "%";
      
      barL.style.width = barPos.toString() + "%";
      barR.style.width = (100 - barPos).toString() + "%";

      pValue.innerHTML = `${barPos.toFixed(2)}%`;
      
    }
}