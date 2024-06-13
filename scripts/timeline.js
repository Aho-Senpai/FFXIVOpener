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
        Temp.addEventListener("mousedown", moveBuffs)
        Temp.style.backgroundColor = "red"; // TODO : change
        document.getElementById("RaidBuffsTimeline").prepend(Temp);
    }
}

function removeFromTimeline() {
    document.getElementById("SkillsTimeline").removeChild(this);
}

//TODO : Edit this a bit, not smooth (something like "whileMouseDown" instead of "onMouseDown" ?)
function moveBuffs() {
    document.onmousedown = (e) => {
        this.classList.add("BuffDivMove");
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