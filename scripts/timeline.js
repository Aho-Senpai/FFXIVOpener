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
            setRaidbuffColorPicker(bgColor);
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
}

let initialDivOffsetX = 0;
function pointerDownBuff(e, resizeObserver) {
    if (!e.target.classList.contains("RaidBuffTimelineBar")) { return; }
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

const raidBuffSelect = document.getElementById("RaidBuffsBarList");
const colorPicker = document.getElementById("RaidBuffsBarListColor");
raidBuffSelect.addEventListener("change", () => {
    let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
    let RBdivColor = buff.style.backgroundColor;
    let pickerColor = rgbToHex(RBdivColor);
    setRaidbuffColorPicker(pickerColor);
});
function setRaidbuffColorPicker(color) {
    colorPicker.value = color;
}
colorPicker.addEventListener("change", () => {
    let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
    buff.style.backgroundColor = colorPicker.value;
});
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);    
    if (result.length !== 3) {
        throw new Error("Invalid input format. Please use the format 'rgb(107, 128, 237)'");
    }
    const r = parseInt(result[0]).toString(16).padStart(2, '0');
    const g = parseInt(result[1]).toString(16).padStart(2, '0');
    const b = parseInt(result[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}
function removeRaidbuff() {
    try {
        let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
        buff.remove();
        removeRaidbuffEntrySelector()
    }
    catch (error) {
        document.getElementById("RaidbuffRemoveButton").remove()
        console.log("There was no Raidbuff to remove, was there?");
        console.log("Well, no more button for you!");
        //throw console.error(error);
    }
}
function removeRaidbuffEntrySelector() {
    const raidbuffsSelector = document.getElementById("RaidBuffsBarList");
    if (raidBuffSelect.options.length != 0){
        raidbuffsSelector.removeChild(raidBuffSelect.options[raidBuffSelect.selectedIndex]);
    }
}