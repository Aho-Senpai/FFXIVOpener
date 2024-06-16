let JobList = [];

document.addEventListener("DOMContentLoaded", () => {
    LoadJobsDataBase();
    setTimeout(() => { MakeJobSelectorInputs() }, 500); // This is a temporary hack to get it working
    // TODO: Fix the issue with MakeJobSelectorElements running before LoadJobsDataBase ends

    // Later : remove the SortableJS dependency and implement this
    new Sortable(document.getElementById("SkillsTimeline")); //Using SortableJS to make timeline items sortable with drag&drop
});

function LoadJobsDataBase () {
    fetch('./DataBase/Jobs.json')
    .then(
        response => {
            if (!response.ok) {
                throw new Error("Fetch Error" + response.status);
            }
            return response.json();
    })
    .then(result => JobList = result.Job)
    .catch((error) => console.error("Unable to fetch data:", error));
}

function MakeJobSelectorInputs() {
    JobList.forEach(Object => {
        let InputTemp = document.createElement("input");
        let ImageTemp = document.createElement("img");

        InputTemp.type = "radio";
        InputTemp.name = "JobSelect";
        InputTemp.classList.add(`JobSelect${Object.Role}${Object.Abbreviation}`, `JobSelectImage`);
        InputTemp.addEventListener("click", () => getJobSkills(Object.Abbreviation, Object.Role));
        
        ImageTemp.src = `./DataBase/Icon/Job/${Object.Abbreviation}.png`;
        InputTemp.appendChild(ImageTemp);
        
        document.getElementById(`JobSelect${Object.Role}`).appendChild(InputTemp);
    });
}

function ToggleJobSelect() {
    const jobSelect = document.getElementById("JobSelect");
    if (!jobSelect) {
        console.error(Error);    
        return;
    }
    jobSelect.style.display = getComputedStyle(jobSelect).display === "block" ? "none" : "block";
}