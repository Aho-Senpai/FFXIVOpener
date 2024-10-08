let GCD = [];
let UnderLevelGCD = [];
let OGCD = [];
let UnderLevelOGCD = [];
let RoleAction = [];
let RaidBuffs = [];
let GlobalSkills = [];

function getJobSkills(JobShort, JobRole) {
    const gcdTitle = document.getElementById("UnderLevelGCDTitle");
    const gcdList = document.getElementById("UnderLevelGCDList");
    const ogcdTitle = document.getElementById("UnderLevelOGCDTitle");
    const ogcdList = document.getElementById("UnderLevelOGCDList");

    gcdTitle.style.display = "flex";
    gcdList.style.display = "none";
    ogcdTitle.style.display = "flex";
    ogcdList.style.display = "none";

    ClearSkills();
    ToggleJobSelect();
    LoadSkills(JobShort, JobRole)
    .then(() => {
        DisplayJobSkills(JobShort, JobRole)
    })
    .then(() => {
        if (!gcdList.hasChildNodes()) {
            gcdTitle.style.display = "none";
            gcdList.style.display = "none";
        }
        if (!ogcdList.hasChildNodes()) {
            ogcdTitle.style.display = "none";
            ogcdList.style.display = "none";
        }
    })
    btnClearTimeline()
}

async function LoadSkills(JobShort, JobRole) {
    try {
        const [
            jobSkillsResponse, 
            roleSkillsResponse, 
            raidBuffsResponse, 
            globalSkillsResponse
        ] = await Promise.all([
            fetch(`./DataBase/Jobs/${JobShort}.json`),
            fetch(`./DataBase/RoleActions.json`),
            fetch(`./DataBase/Raidbuffs.json`),
            fetch(`./DataBase/GlobalSkills.json`)
        ]);
        if (!jobSkillsResponse.ok) 
            throw new Error("Fetch Error: " + jobSkillsResponse.status);
        if (!roleSkillsResponse.ok) 
            throw new Error("Fetch Error: " + roleSkillsResponse.status);
        if (!raidBuffsResponse.ok) 
            throw new Error("Fetch Error: " + raidBuffsResponse.status);
        if (!globalSkillsResponse.ok) 
            throw new Error("Fetch Error: " + globalSkillsResponse.status);
        const [jobSkills, roleSkills, raidBuffs, globalSkills] = await Promise.all([
            jobSkillsResponse.json(),
            roleSkillsResponse.json(),
            raidBuffsResponse.json(),
            globalSkillsResponse.json()
        ]);
        GCD = jobSkills.GCD;
        UnderLevelGCD = jobSkills.UnderlevelGCD;
        OGCD = jobSkills.OGCD;
        UnderLevelOGCD = jobSkills.UnderlevelOGCD;
        RoleAction = roleSkills[JobRole];
        RaidBuffs = raidBuffs.RaidBuffs;
        GlobalSkills = globalSkills.globalSkillsList;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}
function DisplayJobSkills(JobShort, JobRole) {
    const categories = [
        { list: 
            RaidBuffs, 
            basePath: './DataBase/Icon/RaidBuffs/', 
            category: 'RaidBuffs', 
            globalCoolDown: 'RaidBuff' 
        },
        { list: 
            GCD, 
            basePath: `./DataBase/Icon/PvE_Actions/${JobShort}/`, 
            category: 'GCD'
        },
        { list: 
            UnderLevelGCD, 
            basePath: `./DataBase/Icon/PvE_Actions/${JobShort}/`, 
            category: 'UnderLevelGCD'
        },
        { list: 
            OGCD, 
            basePath: `./DataBase/Icon/PvE_Actions/${JobShort}/`, 
            category: 'OGCD'
        },
        { list: 
            UnderLevelOGCD, 
            basePath: `./DataBase/Icon/PvE_Actions/${JobShort}/`, 
            category: 'UnderLevelOGCD'
        },
        { list: 
            RoleAction, 
            basePath: `./DataBase/Icon/RoleActions/${JobRole}/`, 
            category: 'RoleActions' 
        },
        { list: 
            GlobalSkills, 
            basePath: '', 
            category: 'GlobalSkills', 
            customPath: true 
        }
    ];
    categories.forEach(({ list, basePath, category, globalCoolDown, customPath }) => {
        list.forEach(object => {
            let path = customPath ? object.ImageLink : `${basePath}${object.ImageName}.png`;
            let coolDown = globalCoolDown || object.GlobalCoolDown;
            BuildSkillsButtons(category, path, coolDown, object);
        });
    });
}

function BuildSkillsButtons(Category, Path, GlobalCoolDown, Skill) {
    const TempButton = document.createElement("button");
    const TempImage = document.createElement("img");
    const TempName = document.createElement("label");
    TempButton.classList.add(`${Category}Icon`, GlobalCoolDown);
    TempButton.id = Skill.Name;
    TempImage.src = Path;
    TempName.innerHTML = `${Skill.Name}`;
    TempName.classList.add("SkillName");
    TempName.style.display = skillNames ? "block" : "none";
    TempButton.appendChild(TempImage);
    TempButton.appendChild(TempName);
    TempButton.addEventListener("mouseenter", () => showTooltip(Skill));
    TempButton.addEventListener("mouseleave", clearTooltip);
    TempButton.addEventListener("click", addToTimeline);
    document.getElementById(`${Category}List`).appendChild(TempButton);
}

function ClearSkills() {
    const skillLists = [
        "RaidBuffsList", 
        "GCDList",
        "UnderLevelGCDList", 
        "OGCDList", 
        "UnderLevelOGCDList",
        "RoleActionsList", 
        "GlobalSkillsList"
    ];
    skillLists.forEach(id => document.getElementById(id).replaceChildren());
}

function UnderLevelHide(Cat) {
    const elementId = `UnderLevel${Cat}List`;
    const element = document.getElementById(elementId);
    
    if (element.style.display == "none") {
        element.style.display = "flex";
    } else {
        element.style.display = "none";
    }
}
