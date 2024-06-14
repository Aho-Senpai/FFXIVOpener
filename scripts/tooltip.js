function showTooltip(e) {
    // TODO : Add a 1 second delay before showing tooltip?
    //console.log("tooltip on");
    let tip = document.getElementById("Tooltip")
    tip.style.display = "block";
    window.onmousemove = (e) => {
        tip.style.marginLeft = e.clientX + 20 + "px";
        tip.style.top = e.clientY + 20 + "px";
    }
    console.log(e.target);
}



function clearTooltip() {
    //console.log("tooltip off");
    let tip = document.getElementById("Tooltip")
    tip.style.display = "none";
}