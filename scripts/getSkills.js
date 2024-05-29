let GCD = [];
let OGCD = [];
let RoleAction = [];
let RaidBuffs = [];
let GlobalSkills = [];

function getJobSkills(JobShort, JobRole) {    
    LoadJobSkills(JobShort);
    LoadJobRoleSkills(JobRole);
    LoadRaidBuffs();
    LoadGlobalSkills();
    setTimeout( () => { DisplayJobSkills(JobShort) }, 1000 );
    // TODO: Fix the issue with MakeJobSelectorElements running before LoadJobsDataBase ends
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
        console.log(result);
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
        console.log(result); // Gets the expected data (object of arrays)
        console.log(JobRole); // Tank
        console.log(result.JobRole); // Undefined ???
        RoleAction = result.JobRole; // Doesn't want to work, idk why
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

function DisplayJobSkills(JobShort) {
    RaidBuffs.forEach(Object => {
        let temp = document.createElement("button");
        temp.classList = "RaidBuffIcon";
        temp.style.backgroundImage = `url(./DataBase/Icon/RaidBuffs/${Object.ImageName}.png)`;
        document.getElementById(`RaidBuffs`).appendChild(temp);
    })

    GCD.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = "GCDIcon";
        temp.style.backgroundImage = `url(./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png)`;
        document.getElementById(`GCD`).appendChild(temp);
    });

    OGCD.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = "OGCDIcon";
        temp.style.backgroundImage = `url(./DataBase/Icon/PvE_Actions/${JobShort}/${Object.ImageName}.png)`;
        document.getElementById(`OGCD`).appendChild(temp);
    })

    // RoleAction.forEach(Object => {
    //     let temp = document.createElement("button")
    //     temp.classList = "RoleIcon";
    //     temp.style.backgroundImage = `url(./DataBase/Icon/RoleActions/${RoleAction}.png)`;
    //     document.getElementById(`RoleSkills`).appendChild(temp);
    // })

    GlobalSkills.forEach(Object => {
        let temp = document.createElement("button")
        temp.classList = "GlobalSkillsIcon";
        temp.style.backgroundImage = `url(${Object.ImageLink})`;
        document.getElementById(`GlobalSkills`).appendChild(temp);
    })
}
