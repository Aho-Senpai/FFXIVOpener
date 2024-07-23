function addToTimeline() {
    if (this.classList.contains("GCD") || this.classList.contains("OGCD")) {
        const TempImg = this.cloneNode(true);
        TempImg.removeEventListener("click", addToTimeline);
        TempImg.addEventListener("click", removeFromTimeline);
        document.getElementById("SkillsTimeline").appendChild(TempImg);
        
    }
    if (this.classList.contains("RaidBuff")) {
        AddRaidbuff(this);
    }
}

let initialDivOffsetX = 0;
function pointerDownBuff(e, resizeObserver) {
    if (!e.target.classList.contains("RaidBuffTimelineBar") &&
        !e.target.classList.contains("SelfBuffTimelineBar")) { return; }
    e.target.classList.add("BuffDivMove");
    e.target.style.cursor = "grabbing";
    resizeObserver.observe(e.target);
    initialDivOffsetX = e.pageX - e.target.getBoundingClientRect().left;
}
function pointerMoveBuff(e) {
    const target = document.querySelector(".BuffDivMove");
    if (!target) { return; }
    target.style.marginLeft = (e.pageX - initialDivOffsetX) + "px";
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

function btnClearTimeline(force) {
    // force is a boolean so that the actual button still clears the timeline regardless
    // if mox == true we do not want timeline to be cleared when selecting a job.
    if (mox == true && !force) { return; }
    const timelineIds = [
        "RaidBuffsTimeline", 
        "SkillsTimeline", 
        "SelfBuffsTimeline"
    ];
    timelineIds.forEach(id => document.getElementById(id).replaceChildren());
    removeRaidbuffEntrySelector()
}

function removeRaidbuff() {
    try {
        let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
        buff.remove();
        removeRaidbuffEntrySelector()
    }
    catch (error) {
        //throw console.error(error);
    }
}
function removeRaidbuffEntrySelector() {
    const raidbuffsSelector = document.getElementById("RaidBuffsBarList");
    if (raidbuffsSelector.options.length != 0){
        raidbuffsSelector.removeChild(raidbuffsSelector.options[raidbuffsSelector.selectedIndex]);
        // All this under is just to set the correct color of the color picker after deleting a buff
        let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
        let RBdivColor = buff.style.backgroundColor;
        let pickerColor = rgbToHex(RBdivColor);
        setBuffColorPicker(pickerColor);
    }
}

function AddRaidbuff(a) {
    const Temp = document.createElement("div");
    const RaidbuffName = a.id
    const option = document.createElement("option");
    const RBBarList = document.getElementById("RaidBuffsBarList");
    let bgColor;
    RaidBuffs.forEach(element => {
        if (element.Name !== RaidbuffName) {  return; }
        bgColor = element.BackgroundColor;
    });
    Temp.textContent = RaidbuffName;
    Temp.id = RaidbuffName;
    Temp.classList.add("RaidBuffTimelineBar");
    if (RBBarList.childNodes.length == 0) {
        setBuffColorPicker(bgColor);
    }
    option.textContent = RaidbuffName;
    option.value = RaidbuffName;
    document.getElementById("RaidBuffsBarList").appendChild(option);
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

function AddSelfbuff() {
    if (document.getElementById("SelfBuffInput").value == "") {
        alert("please enter value");
        return;
    }
    const SelfbuffName = document.getElementById("SelfBuffInput").value;
    const Temp = document.createElement("div");
    const option = document.createElement("option");
    const SBBarList = document.getElementById("RaidBuffsBarList");
    let bgColor = "red";
    // SelfBuffs.forEach(element => {
    //     if (element.Name !== SelfbuffName) {  return; }
    //     bgColor = element.BackgroundColor;
    // });
    Temp.textContent = SelfbuffName;
    Temp.id = SelfbuffName;
    Temp.classList.add("SelfBuffTimelineBar");
    if (SBBarList.childNodes.length == 0) {
        setBuffColorPicker(bgColor);
    }
    option.textContent = SelfbuffName;
    option.value = SelfbuffName;
    document.getElementById("RaidBuffsBarList").appendChild(option);
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
    document.getElementById("SelfBuffsTimeline").append(Temp);
}