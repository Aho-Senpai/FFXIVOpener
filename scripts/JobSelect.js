let JobList = [];

document.addEventListener("DOMContentLoaded", () => {
    LoadJobsDataBase()
    .then(() => {
        MakeJobSelectorInputs();
    })
    skillsName();
    // Later : remove the SortableJS dependency and implement this
    new Sortable(document.getElementById("SkillsTimeline")); //Using SortableJS to make timeline items sortable with drag&drop
});

async function LoadJobsDataBase () {
    return fetch('./DataBase/JobsList.json')
    .then( response => {
        if (!response.ok) { throw new Error("Fetch Error" + response.status); }
        return response.json();
    })
    .then(result => JobList = result.Job)
    .catch((error) => console.error("Unable to fetch data:", error));
}

function MakeJobSelectorInputs() {
    JobList.forEach(({ Role, Abbreviation }) => {
        const InputTemp = document.createElement("input");
        const LabelTemp = document.createElement("label");
        const ImageTemp = document.createElement("img");

        InputTemp.type = "radio";
        InputTemp.name = "JobSelect";
        InputTemp.classList.add(`JobSelect${Role}${Abbreviation}`);
        InputTemp.id = Abbreviation;
        InputTemp.addEventListener("click", () => getJobSkills(Abbreviation, Role));
        
        LabelTemp.htmlFor = InputTemp.id;
        LabelTemp.classList.add(`JobSelectImage`);

        ImageTemp.src = `./DataBase/Icon/Job/${Abbreviation}.png`;
        LabelTemp.append(InputTemp);
        LabelTemp.append(ImageTemp);
        document.getElementById(`JobSelect${Role}`).appendChild(LabelTemp);
    });
}

function ToggleJobSelect() {
    const jobSelect = document.getElementById("JobSelect");
    if (!jobSelect) {
        console.error(Error);    
        return;
    }
    jobSelect.style.display = getComputedStyle(jobSelect).display === "block" ? "none" : "block"; // condition ? exprIfTrue : exprIfFalse

}