let mox = false; // if true: do not clear timeline when selecting job
mox = document.getElementById("MoxSettingCB").checked;

let skillNames = false;
skillNames = document.getElementById("SkillsSelectNamesCheckbox").checked;

const settingsDiv = document.getElementById("SettingsDiv");
function settingsBtn() {
    settingsDiv.style.display = getComputedStyle(settingsDiv).display === "block" ? "none" : "block";
}
function moxSetting() {
    const Mox = document.getElementById("MoxSettingCB");
    mox = Mox.checked;
}
function skillsName() {
    const skillNamesChecked = document.getElementById("SkillsSelectNamesCheckbox").checked;
    skillNames = skillNamesChecked;
    document.querySelectorAll(".SkillName").forEach(element => {
        element.style.display = skillNamesChecked ? "block" : "none";
    });
}

const TimelineImgSizeInput = document.getElementById("TimelineImageSizeSlider");
const TimelineImgSizeOutput = document.getElementById("TimelineImageSizeOutput");
TimelineImgSizeInput.addEventListener("input", () => {
    TimelineImgSizeOutput.textContent = TimelineImgSizeInput.value;
    document.getElementById("Timeline").style.cssText = `--timeline-image-size: ${TimelineImgSizeInput.value}px`;
});

const OGCDTimelineImgSizeInput = document.getElementById("OGCDTimelineImageSizeSlider");
const OGCDTimelineImgSizeOutput = document.getElementById("OGCDTimelineImageSizeOutput");
OGCDTimelineImgSizeInput.addEventListener("input", () => {
    OGCDTimelineImgSizeOutput.textContent = OGCDTimelineImgSizeInput.value;
    document.getElementById("SkillsTimeline").style.cssText = `--ogcdtimeline-image-size: ${OGCDTimelineImgSizeInput.value}px`;
});

const SkillSelectImgSizeInput = document.getElementById("SkillSelectImageSizeSlider");
const SkillSelectImgSizeOutput = document.getElementById("SkillSelectImageSizeOutput");
SkillSelectImgSizeInput.addEventListener("input", () => {
    SkillSelectImgSizeOutput.textContent = SkillSelectImgSizeInput.value;
    document.getElementById("SkillSelect").style.cssText = `--skillSelect-image-size: ${SkillSelectImgSizeInput.value}px`;
});


const BuffTextSizeInput = document.getElementById("BuffTextSizeSlider");
const BuffTextSizeOutput = document.getElementById("BuffTextSizeOutput");
BuffTextSizeInput.addEventListener("input", () => {
    BuffTextSizeOutput.textContent = BuffTextSizeInput.value;
    document.getElementById("RaidBuffsTimeline").style.cssText = `--buffText-size: ${BuffTextSizeInput.value}px`;
    document.getElementById("SelfBuffsTimeline").style.cssText = `--buffText-size: ${BuffTextSizeInput.value}px`;
});

function closeSettingsDiv() {
    settingsDiv.style.display = "none";
}