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
        let temp = document.createElement("button");
        temp.classList = "RaidBuffIcon";
        temp.style.backgroundImage = `url(./DataBase/Icon/RaidBuffs/${Object.ImageName}.png)`;
        document.getElementById(`RaidBuffsList`).appendChild(temp);
    })

    GCD.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = "GCDIcon GCD";
        temp.style.backgroundImage = `url(./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png)`;
        document.getElementById(`GCDList`).appendChild(temp);
    });

    OGCD.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = "OGCDIcon OGCD";
        temp.style.backgroundImage = `url(./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png)`;
        document.getElementById(`OGCDList`).appendChild(temp);
    })

    RoleAction.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = `RoleIcon ${Object.GlobalCoolDown}`;
        temp.style.backgroundImage = `url(./DataBase/Icon/RoleActions/${JobRole}/${Object.ImageName}.png)`;
        document.getElementById(`RoleSkillsList`).appendChild(temp);
    })

    GlobalSkills.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = `GlobalSkillsIcon ${Object.GlobalCoolDown}`;
        if (Object.ID == 0){
            temp.classList.add("PullIcon")
        }
        temp.style.backgroundImage = `url(${Object.ImageLink})`;
        document.getElementById(`GlobalSkillsList`).appendChild(temp);
    })
}

function ClearSkills() {
    document.getElementById("RaidBuffsList").replaceChildren();
    document.getElementById("GCDList").replaceChildren();
    document.getElementById("OGCDList").replaceChildren();
    document.getElementById("RoleSkillsList").replaceChildren();
    document.getElementById("GlobalSkillsList").replaceChildren();
}