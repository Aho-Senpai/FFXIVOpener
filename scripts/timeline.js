function addToTimeline() {
    if (this.classList.contains("GCD") || this.classList.contains("OGCD")) {
        const TempImg = this.cloneNode(true);
        TempImg.removeEventListener("click", addToTimeline);
        TempImg.addEventListener("click", removeFromTimeline);
        document.getElementById("SkillsTimeline").appendChild(TempImg);
    }
    if (this.classList.contains("RaidBuff")) {
        const Temp = document.createElement("div");
        const RaidbuffName = this.id
        let bgColor;
        RaidBuffs.forEach(element => {
            if (element.Name !== RaidbuffName) {  return; }
            bgColor = element.BackgroundColor;
        });
        Temp.textContent = RaidbuffName;
        Temp.classList.add("RaidBuffTimelineBar");
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (!(entry.target === Temp)) { return; }
                entry.target.classList.remove("BuffDivMove");
                entry.target.style.cursor = "grab";
        }});
        Temp.addEventListener("pointerdown", (e) => pointerDownBuff(e, resizeObserver));
        Temp.addEventListener("pointermove", (e) => pointerMoveBuff(e));
        Temp.addEventListener("pointerup", (e) => pointerUpBuff(e, resizeObserver));
        Temp.style.backgroundColor = bgColor;
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
    //TODO: Possibly replace 50 by "X position of div?"
    e.target.style.marginLeft = (e.pageX - 50) + "px";
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
    if (mox == true) { return; } // if mox == true we do not want timeline to be cleared when selecting a job
    const timelineIds = [
        "RaidBuffsTimeline", 
        "SkillsTimeline", 
        "SelfBuffsTimeline"
    ];
    timelineIds.forEach(id => document.getElementById(id).replaceChildren());
}
