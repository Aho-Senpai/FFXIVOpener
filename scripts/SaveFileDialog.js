let FileName = document.getElementById("SaveFileName").value;
let TimeLineDiv = document.getElementById('TimelineDiv');

function btnShareTimeline() {
    let div = document.getElementById("SaveDialogDiv");
    let SelectedJob = document.querySelector('input[name="JobSelect"]:checked');
    let JobSelectDivDisplay = document.getElementById("JobSelect").style.display;

    if(JobSelectDivDisplay == "" || JobSelectDivDisplay != "none") {
        return; // If JobSelect is open, don't try to save
    }

    if (div.style.display == "flex") {
        div.style.display = "none"
    }
    else {
    div.style.display = "flex"
    }

    FileName = SelectedJob.id;
    document.getElementById("SaveFileName").placeholder = FileName;
}
function saveToPng() {
    domtoimage.toBlob(TimeLineDiv)
    .then(function (blob) {
        saveAs(blob, `${FileName}.png`);
    });
}
function saveToJpeg() {
    domtoimage.toJpeg(TimeLineDiv, { quality: 1 })
    .then(function (blob) {
        saveAs(blob, `${FileName}.jpeg`)
    });
}
async function saveAsSvg() {
    //TODO: to implement (once implemented not forget to remove the disable on the html element)
    return;
}