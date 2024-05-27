let jobList = [];
let jobSkills = {};
let roleSkills = {};
let currentJobId = 0;
let MoxSetting = false;

const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";

document.addEventListener("DOMContentLoaded", () => {
    fetch(xivapi_request)
        .then((response) => response.json())
        .then(function (json) {
            json.Results.forEach(job => {
                // If it's a Class, ignore it
                if (job.ItemSoulCrystalTargetID === 0) { return; }
                // If it's a limited job, assign it to custom role for sorting later.
                if (job.IsLimitedJob === 1) { job.Role = 5; }

                // This block is filtering Crafter/Gatherer roles
                let classJobCategoryIds = [30, 31];
                // ClassJobCategory.ID 30 & 31 = Disciple of War/Magic
                // ClassJobCategory.ID 32 & 33 = Disciple of Land/Hand
                if (!classJobCategoryIds.includes(job.ClassJobCategory.ID)) { return; } // IF it does NOT include 30/31, skip it

                // Here we are sorting Casters out of Ranged
                if (job.Role === 3 && job.ClassJobCategory.ID === 31)
                    job.Role = 6;

                // Finally, push everything to the list
                jobList.push(job);
            });

            let roleSortOrder = [1, 4, 2, 3, 6, 5]; // 1 Tank, 4 Healer, 2 Melee, 3 Ranged, 6 Custom Ranged Magic, 5 Custom Limited Job 

            // Sorting black magic intensifies
            jobList.sort(function (a, b) {
                if (a.Role == b.Role)
                    return a.Role - b.Role;
                return roleSortOrder.indexOf(a.Role) - roleSortOrder.indexOf(b.Role);
            });

            // Add the Inputs
            jobList.forEach(job => {
                let JobSelectInput = document.createElement("input");
                JobSelectInput.type = "radio";
                JobSelectInput.name = "JobSelect";
                JobSelectInput.classList = `JobSelect-Icon Role-${job.Role}`;
                // Add a onClick event passing job ID
                JobSelectInput.setAttribute("onclick", `getJobSkills(${job.ID})`);
                // Add a CSS background-image
                JobSelectInput.style.backgroundImage = `url('https://xivapi.com${job.Icon}')`;
                // Add a custom color based on role for the background-image
                JobSelectInput.style.backgroundColor = jobSelectBackgroundColor(job.Role);
                // Add it to the HTML
                document.getElementById("Job-Select").appendChild(JobSelectInput);
            });
        })
        .catch(function (ex) {
            console.log("parsing failed", ex);
        });
    // Make the rotation div sortable (calls sortableJS that is imported index.html)
    // may break for older browsers ???
    // will need to switch to something better at some point.
    new Sortable(document.getElementById("Rotation-Skills"));
    new Sortable(document.getElementById("Rotation-Buffs"));
});

function getJobSkills(jobID) {
    let JOB = jobList.find(x => x.ID === jobID).Abbreviation;
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${JOB}=1,IsPvP=0,ActionCategory.ID%3E=2,ActionCategory.ID%3C=4&columns=ID,Icon,Name,Url,ActionCombo.ID,Description,Cast100ms,Recast100ms,Range,EffectRange,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction,IsPlayerAction&Limit=250&page=`;

    fetch(url)
        .then((response) => response.json())
        .then(function (json) {
            jobSkills[jobID] = json.Results.filter(action => action.IsRoleAction === 0);
            roleSkills[jobID] = json.Results.filter(action => action.IsRoleAction === 1);
            clearDivs();
            sortJobSkills(jobID);
            currentJobId = jobID;
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })
}

function jobSelectBackgroundColor(role) {
    switch (role) {
        case 1:
            return "#425ABD"; //Tanks (Blue)
        case 4:
            return "#397B18"; // Healers (Green)
        case 2: case 3: case 5: case 6:
            return "#843131"; // DPS (Red)
        default:
            return "#FFFFFF"; // Others (White) <- Should not happen
    }
}

function sortJobSkills(jobID) {
    jobSkills[jobID].forEach((skill) => {
        // If skill is in blacklist, skip it
        if (skillsBlacklist.includes(skill.ID)) { return; }
        // If it's a player action or it's in the whitelist
        if (skill.IsPlayerAction == "1" || skillsWhitelist.includes(skill.ID)) {
            // If it's a spell or weaponskill
            if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {
                // If it's not in the OGCD overrite or blacklist => GCD
                if (!ogcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                    addImageToList("GCD-List", skill, false, true);
                }
                // If it's in the OGCD override => OGCD
                else if (ogcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                    addImageToList("OGCD-List", skill, false, false);
                }
            }
            // If it's an ability
            else if (skill.ActionCategory.Name === "Ability") {
                // If it's not in the GCD overrite or blacklist => OGCD
                if (!gcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                    addImageToList("OGCD-List", skill, false, false);
                }
                // If it's in the GCD override => GCD
                else if (gcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                    addImageToList("GCD-List", skill, false, true);
                }
            }
        }
    });
    roleSkills[jobID].forEach((skill) => {
        if (skill.ActionCategory.Name === "Ability") {
            addImageToList("Role-Skills-List", skill, false, false);
        }
        // Weapponskill is mainly for futureproofing (tho unlikely)
        else if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {
            addImageToList("Role-Skills-List", skill, false, true);
        }
    });
    globalSkillsList.forEach((skill) => {
        // If it's Pull (Placeholder)
        if (skill.ID == 0) {
            addImageToList("Global-Skills-List", skill, true, true);
        }
        // If it's GCD placeholder
        else if (skill.ID == 1) {
            addImageToList("Global-Skills-List", skill, true, true);
        }
        // If it's OGCD placeholder
        else if (skill.ID == 2) {
            addImageToList("Global-Skills-List", skill, true, false);
        }
        // If it's AutoAttack or Sprint or Potion: OGCD
        else if (skill.ID == 3 || skill.ID == 7 || skill.Name.includes("Tincture")) {
            addImageToList("Global-Skills-List", skill, false, false);
        }
        // If it's Limit Break: GCD
        else if (skill.ID == 209) {
            addImageToList("Global-Skills-List", skill, false, true);
        }
    });
}

function addImageToList(dest, skill, isLocalImg, isGCD) {
    let image = document.createElement("img");
    if (isLocalImg)
        image.src = `${skill.Icon}`;
    else
        image.src = `https://xivapi.com${skill.Icon}`;
    image.className = "Skill-Icon";
    image.dataset.id = `${skill.ID}`;
    image.setAttribute("data-gcd", isGCD ? "GCD" : "OGCD");
    image.addEventListener("mouseover", showTooltip());
    image.addEventListener("click", () => {
        let rotationDiv = document.getElementById("Rotation-Skills");
        let imageCopy = image.cloneNode();
        imageCopy.className = "Skill-Rotation";
        // Add a bottom padding if OGCD
        if (imageCopy.dataset.gcd == "OGCD") {
            imageCopy.style.paddingBottom = "20px";
        }
        // Make PULL placeholder not look too small or too big
        if (imageCopy.dataset.id == "0") {
            imageCopy.style.height = "60px";
            imageCopy.style.width = "20px";
        }
        imageCopy.addEventListener("mouseover", showTooltip());
        imageCopy.addEventListener("click", (event) => {
            rotationDiv.removeChild(event.target);
        });
        rotationDiv.appendChild(imageCopy);
        imageCopy.scrollIntoView();
    });
    document.getElementById(dest).appendChild(image);

    function showTooltip() {
        return (event) => {
            document.getElementById("Tooltip-title").textContent = `${skill.Name}`;
            // This IF is only matching with the custom IDs in data.js (being PULL and GCD/OGCD placeholders)
            if (event.target.dataset.id <= 2)
                document.getElementById("Tooltip-img").src = `${skill.Icon}`;
            else
                document.getElementById("Tooltip-img").src = `https://xivapi.com${skill.Icon}`;
            document.getElementById("Tooltip-desc").innerHTML = skill.Description;
            document.getElementById("Tooltip-CastTime").innerHTML = `Cast:\n${parseInt(skill.Cast100ms) / 10}s`;
            document.getElementById("Tooltip-RecastTime").innerHTML = `Recast:\n${parseInt(skill.Recast100ms) / 10}s`;
            // Might want to handle -1 range
            document.getElementById("Tooltip-Range").innerHTML = `Range:\n${parseInt(skill.Range)} Yalms`;
            document.getElementById("Tooltip-Radius").innerHTML = `Radius:\n${parseInt(skill.EffectRange)} Yalms`;
        };
    }
}

function clearDivs() {
    if (!MoxSetting) {
        clearRotation();
    }
    // If MoxSetting = true = do not clear the timeline
    let el = document.getElementsByClassName("Skill-Icon");
    while (el.length > 0)
        el[0].parentNode.removeChild(el[0]);
}

function clearRotation() {
    let rotationSkills = document.getElementsByClassName("Skill-Rotation");
    let rotationBuffs = document.getElementById("Rotation-Buffs");
    let buffList = document.getElementById("RotationBuffList");

    // Delerte Icons in rotation
    while (rotationSkills.length > 0)
        rotationSkills[0].parentNode.removeChild(rotationSkills[0]);
    // Delete Buffs in rotation
    while (rotationBuffs.firstChild)
        rotationBuffs.removeChild(rotationBuffs.lastChild);
    // Delete Buffs in dropdown
    while (buffList.firstChild) {
        buffList.removeChild(buffList.lastChild);
    }
}

document.getElementById("ffxiv-logo-header").addEventListener("click", () => {
    let element = document.getElementById("Job-Select");
    let main = document.getElementById("main");

    if (getComputedStyle(element).display === "none") {
        element.style.display = "flex";
        main.style.gridColumn = "2";
    }
    else if (getComputedStyle(element).display === "flex") {
        element.style.display = "none";
        main.style.gridColumn = "1 / span 2";
    }
    else {
        alert("Hmm ... If you can reproduce this please submit a bug repport on the github. Thanks.");
    }
});

// Buttons Links
function discord_btn_click() {
    window.open("https://discord.gg/dPFSM53");
}
function xivapiBtn() {
    window.open("https://xivapi.com/");
}
function githubBtn() {
    window.open("https://github.com/Aho-Senpai/FFXIVOpener");
}

// SuperSecretSettings
function sssClick() {
    let sssBtn = document.getElementById("sss-btn");
    if (MoxSetting) {
        MoxSetting = false;
        sssBtn.style.borderColor = '#FF7F50';
    }
    else {
        MoxSetting = true;
        sssBtn.style.borderColor = '#228B22';
    }
}

function addBuff() {
    let buffName = document.getElementById("BuffName").value;
    let buffColor = document.getElementById("BuffColor").value;
    // If buffName is empty send alert
    if (buffName == "") {
        alert("Enter a buff name you fool");
        return;
    }
    let rotationDiv = document.getElementById("Rotation-Buffs");
    let buffBar = document.createElement("div");

    let BuffList = document.getElementById("RotationBuffList");
    let buffItem = document.createElement("option");
    buffItem.value = buffName;
    buffItem.innerHTML = buffName;
    buffItem.id = buffName;

    buffBar.innerHTML = buffName;
    buffBar.style.backgroundColor = buffColor;
    buffBar.style.textAlign = "center";
    buffBar.id = buffName;
    buffBar.className = "draggable";

    BuffList.appendChild(buffItem);
    rotationDiv.prepend(buffBar);
    // Clear the text input.
    document.getElementById("BuffName").value = "";
}

function deleteBuff() {
    let buffBar = document.getElementById("Rotation-Buffs");
    let buffList = document.getElementById("RotationBuffList");
    let SelectedBuff = document.getElementById(buffList.value);

    buffBar.removeChild(SelectedBuff);
    buffList.removeChild(document.getElementById(buffList.value));
}

// This is a temporary fix until done "properly"
function addBuffMargin() {
    let buffList = document.getElementById("RotationBuffList");
    let buffBar = document.getElementById(buffList.value);
    buffBar.style.marginLeft = (parseInt((buffBar.style.marginLeft) || parseInt(window.getComputedStyle(buffBar).marginLeft))) + 10 + 'px';
}
function removeBuffMargin() {
    let buffList = document.getElementById("RotationBuffList");
    let buffBar = document.getElementById(buffList.value);
    buffBar.style.marginLeft = (parseInt((buffBar.style.marginLeft) || parseInt(window.getComputedStyle(buffBar).marginLeft))) - 10 + 'px';
}