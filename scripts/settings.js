let mox = false; // if true: do not clear timeline when selecting job
mox = document.getElementById("MoxSettingCB").checked;
function settingsBtn() {
    const settingsDiv = document.getElementById("SettingsDiv");
    settingsDiv.style.display = getComputedStyle(settingsDiv).display === "block" ? "none" : "block";
}
function moxSetting() {
    const Mox = document.getElementById("MoxSettingCB");
    Mox.checked = Mox.checked;
    mox = Mox.checked;
}