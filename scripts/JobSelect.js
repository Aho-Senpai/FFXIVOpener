let JobList = [];

document.addEventListener("DOMContentLoaded", () => {
    LoadJobsDataBase();
    setTimeout(() => { MakeJobSelectorInputs() }, 500); // This is a temporary hack to get it working
    // TODO: Fix the issue with MakeJobSelectorElements running before LoadJobsDataBase ends
    ToggleJobSelect();
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
        InputTemp.classList = `JobSelect${Object.Role}${Object.Abbreviation} JobSelectImage`;        
        InputTemp.setAttribute("onclick", `getJobSkills(\'${Object.Abbreviation}\',\'${Object.Role}\')`);
        
        ImageTemp.src = `./DataBase/Icon/Job/${Object.Abbreviation}.png`;
        InputTemp.appendChild(ImageTemp);
        
        document.getElementById(`JobSelect${Object.Role}`).appendChild(InputTemp);
    });
}

function ToggleJobSelect() {
    let jobSelect = document.getElementById("JobSelect");
    if (getComputedStyle(jobSelect).width !== "0px") {
        jobSelect.style.width = 0;
        return;
    }
    jobSelect.style.width = "auto";
}