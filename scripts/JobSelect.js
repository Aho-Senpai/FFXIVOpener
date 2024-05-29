let JobList = [];

document.addEventListener("DOMContentLoaded", () => {
    LoadJobsDataBase();
    setTimeout(() => { MakeJobSelectorElements() }, 500); // This is a temporary hack to get it working
    // TODO: Fix the issue with MakeJobSelectorElements running before LoadJobsDataBase ends
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

function MakeJobSelectorElements() {
    JobList.forEach(Object => {
        let temp = document.createElement("input");
        temp.type = "radio";
        temp.name = "JobSelect";
        temp.classList = `JobSelect${Object.Role}${Object.Abbreviation} JobSelectImage`;
        temp.style.backgroundImage = `url(./DataBase/Icon/Job/${Object.Abbreviation}.png)`;
        temp.setAttribute("onclick", `getJobSkills(\'${Object.Abbreviation}\',\'${Object.Role}\')`);
        document.getElementById(`JobSelect${Object.Role}`).appendChild(temp);
    });
}
