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

const raidBuffSelect = document.getElementById("RaidBuffsBarList");
const colorPicker = document.getElementById("RaidBuffsBarListColor");
raidBuffSelect.addEventListener("change", () => {
    let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
    let RBdivColor = buff.style.backgroundColor;
    let pickerColor = rgbToHex(RBdivColor);
    setBuffColorPicker(pickerColor);
});
function setBuffColorPicker(color) {
    colorPicker.value = color;
}
colorPicker.addEventListener("change", () => {
    let buff = document.getElementById(raidBuffSelect.options[raidBuffSelect.selectedIndex].text);
    buff.style.backgroundColor = colorPicker.value;
});