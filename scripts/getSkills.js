let GCD = [];
let OGCD = [];
let RoleAction = [];
let RaidBuffs = [];
let GlobalSkills = [];

function getJobSkills(JobShort, JobRole) {    
    ClearSkills();
    ToggleJobSelect();
    LoadJobSkills(JobShort);
    LoadJobRoleSkills(JobRole);
    LoadRaidBuffs();
    LoadGlobalSkills();
    setTimeout( () => { DisplayJobSkills(JobShort, JobRole) }, 500 );
    // TODO: Fix the issue with DisplayJobSkills running before fetch ends
}

//TODO: Make a function that handle fetch instead of doing that 20 times
function LoadJobSkills(JobShort) {
    fetch(`./DataBase/${JobShort}.json`)
    .then(
        response => {
            if (!response.ok){
                throw new Error("Fetch Error" + response.status);
            }
            return response.json();
    })
    .then ( result => {
        GCD = result.GCD;
        OGCD = result.OGCD;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function LoadJobRoleSkills(JobRole) {
    fetch(`./DataBase/RoleActions.json`)
    .then(
        response => {
            if (!response.ok){
                throw new Error("Fetch Error" + response.status);
            }
            return response.json();
    })
    .then( result => {
        RoleAction = result[JobRole];
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function LoadRaidBuffs() {
    fetch(`./DataBase/Raidbuffs.json`)
    .then(
        response => {
            if (!response.ok){
                throw new Error("Fetch Error" + response.status);
            }
            return response.json();
    })
    .then( result => {
        RaidBuffs = result.RaidBuffs;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function LoadGlobalSkills() {
    fetch(`./DataBase/GlobalSkills.json`)
    .then(
        response => {
            if (!response.ok){
                throw new Error("Fetch Error" + response.status);
            }
            return response.json();
    })
    .then( result => {
        GlobalSkills = result.globalSkillsList;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function DisplayJobSkills(JobShort, JobRole) {
    RaidBuffs.forEach(Object => {
        let Path = `./DataBase/Icon/RaidBuffs/${Object.ImageName}.png`
        let GlobalCoolDown = "RaidBuff"
        let TempButton = document.createElement("button");
        let TempImage = document.createElement("img");
        TempButton.classList.add("RaidBuffsIcon");
        TempButton.classList.add(`${GlobalCoolDown}`);
        TempButton.id = `${Object.Name}`;
        TempImage.src = Path;
        TempButton.appendChild(TempImage);
        //TempButton.addEventListener("mouseenter", showTooltip)
        //TempButton.addEventListener("mouseleave", clearTooltip)
        TempButton.addEventListener("click", addToTimeline)
        document.getElementById("RaidBuffsList").appendChild(TempButton);
    })

    GCD.forEach(Object => {
        let Path = `./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png`;
        let GlobalCoolDown = Object.GlobalCoolDown;
        BuildSkillsButtons("GCD", Path, GlobalCoolDown);
    });

    OGCD.forEach(Object => {
        let Path = `./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png`;
        let GlobalCoolDown = Object.GlobalCoolDown;
        BuildSkillsButtons("OGCD", Path, GlobalCoolDown);
    })

    RoleAction.forEach(Object => {
        let Path = `./DataBase/Icon/RoleActions/${JobRole}/${Object.ImageName}.png`;
        let GlobalCoolDown = Object.GlobalCoolDown;
        BuildSkillsButtons("RoleActions", Path, GlobalCoolDown);
    })

    GlobalSkills.forEach(Object => {
        let Path = `${Object.ImageLink}`;
        let GlobalCoolDown = Object.GlobalCoolDown;
        BuildSkillsButtons("GlobalSkills", Path, GlobalCoolDown);
    })
}
function BuildSkillsButtons(Category, Path, GlobalCoolDown) {
    let TempButton = document.createElement("button");
    let TempImage = document.createElement("img");

    TempButton.classList.add(`${Category}Icon`);
    TempButton.classList.add(`${GlobalCoolDown}`);

    TempImage.src = Path;
    TempButton.appendChild(TempImage);

    TempButton.addEventListener("mouseenter", showTooltip)
    TempButton.addEventListener("mouseleave", clearTooltip)
    TempButton.addEventListener("click", addToTimeline)

    document.getElementById(`${Category}List`).appendChild(TempButton);
}

function ClearSkills() {
    document.getElementById("RaidBuffsList").replaceChildren();
    document.getElementById("GCDList").replaceChildren();
    document.getElementById("OGCDList").replaceChildren();
    document.getElementById("RoleActionsList").replaceChildren();
    document.getElementById("GlobalSkillsList").replaceChildren();
}