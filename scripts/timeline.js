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
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === Temp) {
                    entry.target.classList.remove("BuffDivMove");
                    entry.target.style.cursor = "grab";
                }
            }
        })
        Temp.addEventListener("pointerdown", (e) => pointerDownBuff(e, resizeObserver));
        Temp.addEventListener("pointermove", (e) => pointerMoveBuff(e));
        Temp.addEventListener("pointerup", (e) => pointerUpBuff(e, resizeObserver));
        Temp.style.backgroundColor = "red"; // TODO : change
        document.getElementById("RaidBuffsTimeline").prepend(Temp);
    }
}
function pointerDownBuff(e, resizeObserver) {
    if (!e.target.classList.contains("RaidBuffTimelineBar")) { return; }
    e.target.classList.add("BuffDivMove");
    e.target.style.cursor = "grabbing";
    resizeObserver.observe(e.target);
}
function pointerMoveBuff(e) {
    if (!e.target.classList.contains("BuffDivMove")) { return; }
    let x = e.pageX;
    e.target.style.marginLeft = (x - 50) + "px";
}
function pointerUpBuff(e, resizeObserver) {
    if (!e.target.classList.contains("BuffDivMove")) { return; }
    e.target.classList.remove("BuffDivMove");
    e.target.style.cursor = "grab";
    resizeObserver.unobserve(e.target);
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