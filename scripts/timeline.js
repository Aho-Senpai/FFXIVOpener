function addToTimeline() {
    if (this.classList.contains("GCD") || this.classList.contains("OGCD")) {
        let TempImg = this.cloneNode(true);
        TempImg.removeEventListener("click", addToTimeline);
        TempImg.addEventListener("click", removeFromTimeline);
        document.getElementById("SkillsTimeline").appendChild(TempImg);
    }
    if (this.classList.contains("RaidBuff")) {
        //console.log(this.id);
        let Temp = document.createElement("div");
        Temp.textContent = this.id;
        Temp.classList.add("RaidBuffTimelineBar")
        Temp.addEventListener("mousedown", moveBuffs)
        Temp.style.backgroundColor = "red"; // TODO : change
        document.getElementById("RaidBuffsTimeline").prepend(Temp);
    }
}

function removeFromTimeline() {
    document.getElementById("SkillsTimeline").removeChild(this);
}

//TODO : make it not move the bar while resizing it
function moveBuffs() {
    document.onmousedown = (e) => {
        if (e.target.classList.contains("RaidBuffTimelineBar")){
            this.classList.add("BuffDivMove");
        }
    }
    document.onmousemove = (e) => {
        if (this.classList.contains("BuffDivMove")) {
            let x = e.pageX;
            this.style.marginLeft = (x - 50) + "px";
        }
    }
    document.onmouseup = (e) => {
        this.classList.remove("BuffDivMove");
    }
}