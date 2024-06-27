let FileName = document.getElementById("SaveFileName").value;
const TimeLineDiv = document.getElementById('TimelineDiv');

const shareDiv = document.getElementById("SaveDialogDiv");
function btnShareTimeline() {
    const jobSelectDiv = document.getElementById("JobSelect");
    if (jobSelectDiv.style.display !== "none") {
        return;
    }
    shareDiv.style.display = shareDiv.style.display === "flex" ? "none" : "flex"; // condition ? exprIfTrue : exprIfFalse
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

//TODO : add event listener to remove the div is click on "black space" aka outside the div?
function closeShareDiv() {
    shareDiv.style.display = "none";
}