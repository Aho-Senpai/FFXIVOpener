function addToTimeline() {
    if (this.classList.contains("GCD") || this.classList.contains("OGCD")) {
        let TempImg = this.cloneNode(true);
        TempImg.removeEventListener("click", addToTimeline);
        TempImg.addEventListener("click", removeFromTimeline);
        document.getElementById("SkillsTimeline").appendChild(TempImg);
    }
    if (this.classList.contains("RaidBuff")) {
        console.log(this.id);
        let Temp = document.createElement("div");
        Temp.textContent = this.id;
        Temp.style.backgroundColor = "red"; // TODO : change
        document.getElementById("RaidBuffsTimeline").prepend(Temp);
    }
}

function removeFromTimeline() {
    document.getElementById("SkillsTimeline").removeChild(this);
}

//TODO : Add ability to move raidbuffs (move right = add margin left)