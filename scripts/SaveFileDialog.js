let FileName = document.getElementById("SaveFileName").value;
const TimeLineDiv = document.getElementById('TimelineDiv');

function btnShareTimeline() {
    const div = document.getElementById("SaveDialogDiv");
    const jobSelectDiv = document.getElementById("JobSelect");
    if (jobSelectDiv.style.display !== "none") {
        return;
    }
    div.style.display = div.style.display === "flex" ? "none" : "flex";
    const selectedJob = document.querySelector('input[name="JobSelect"]:checked');
    if (selectedJob) {
        document.getElementById("SaveFileName").placeholder = selectedJob.id;
    }
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
    // domtoimage.toSvg(TimeLineDiv)
    // .then(function (blob) {
    //     saveAs(blob, `${FileName}.svg`)
    // });
}