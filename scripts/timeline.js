function addToTimeline() {
    if (this.classList.contains("GCD") || this.classList.contains("OGCD")) {
        let TempImg = this.cloneNode(true);
        TempImg.removeEventListener("click", addToTimeline);
        TempImg.addEventListener("click", removeFromTimeline);
        document.getElementById("SkillsTimeline").appendChild(TempImg);
    }
    if (this.classList.contains("RaidBuff")) {
        let Temp = document.createElement("div");
        Temp.textContent = this.id;
        Temp.classList.add("RaidBuffTimelineBar");
        Temp.addEventListener("pointerdown", (e) => pointerDownBuff(e));
        Temp.addEventListener("pointermove", (e) => pointerMoveBuff(e));
        Temp.addEventListener("pointerup", (e) => pointerUpBuff(e));
        Temp.style.backgroundColor = "red"; // TODO : change
        document.getElementById("RaidBuffsTimeline").prepend(Temp);
    }
}
function pointerDownBuff(e) {
    if (!e.target.classList.contains("RaidBuffTimelineBar")) { return; }
    e.target.classList.add("BuffDivMove");
    e.target.style.cursor = "grabbing";
}
function pointerMoveBuff(e) {
    if (!e.target.classList.contains("BuffDivMove")) { return; }
    let x = e.pageX;
    e.target.style.marginLeft = (x - 50) + "px";
}
function pointerUpBuff(e) {
    if (!e.target.classList.contains("BuffDivMove")) { return; }
    e.target.classList.remove("BuffDivMove");
    e.target.style.cursor = "grab";
}

function removeFromTimeline() {
    document.getElementById("SkillsTimeline").removeChild(this);
}

function btnClearTimeline() {
    //TODO: MoxSetting = no clear timeline
    document.getElementById("RaidBuffsTimeline").replaceChildren();
    document.getElementById("SkillsTimeline").replaceChildren();
    document.getElementById("SelfBuffsTimeline").replaceChildren();
}

function btnShareTimeline() {
    //TODO: add a menu to rename the file and select the format?
    domtoimage.toBlob(document.getElementById('TimelineDiv'))
    .then(function (blob) {
        window.saveAs(blob, 'Timeline.png');
    });
}