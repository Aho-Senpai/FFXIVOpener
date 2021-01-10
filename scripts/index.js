let jobList = [];
let jobSkills = {};
let roleSkills = {};
let currentJobId = 0;
let MoxSetting = false;

$(function() {
    $.getJSON('https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation', function(data) {
        $.each(data.Results, function (_, job) {
            if(job.IsLimitedJob === 1){
                job.Role = 5;
            }
            if(job.ItemSoulCrystalTargetID === 0) 
                return;
            let classJobCategoryIds = [30, 31];
            if(!classJobCategoryIds.includes(job.ClassJobCategory.ID)) 
                return;
            if(job.Role === 3 && job.ClassJobCategory.ID === 31)
                job.Role = 6;
            jobList.push(job);
        });
        let roleSortOrder = [1, 4, 2, 3, 6, 5]; // 1 Tank, 4 Healer, 2 Melee, 3 Ranged, 6 Custom Ranged Magic, 5 Custom Limited Job 
        jobList.sort(function(a,b){
            if(a.Role == b.Role) 
                return a.Role - b.Role;
            return roleSortOrder.indexOf(a.Role) - roleSortOrder.indexOf(b.Role);
        });                    
        $.each(jobList, function (_, job) {
            let image = $(`<img src="https://xivapi.com${job.Icon}" width=40 height=40>`)
                .css("border-color", "rgb(226, 203, 135)")
                .css("border-style", "solid")
                .css("border-radius", "13px")
                .css("margin", "2px");
            let link = $("<a></a>").attr("id", `job-${job.ID}`).attr("href", "#").attr("data-id", job.ID).append(image);
            $(`#role-${job.Role}`).append(link);
            link.click(function(){
                getJobSkills($(this).data("id"));
                currentJobId = job.ID;
                if (!MoxSetting) {
                    ClearBtn();
                }
            });
        });
    });
    $("#rotationActual").sortable();
    $("#rotationActual").disableSelection();
});

function getJobSkills(jobId) {
    let shorthand = jobList.find(x => x.ID === jobId).Abbreviation
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${shorthand}=1,IsPvP=0,ActionCategory.ID%3E=2,ActionCategory.ID%3C=4&columns=ID,Icon,Name,Url,ActionCombo.ID,Description,Cast100ms,Recast100ms,Range,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction,IsPlayerAction&Limit=250&page=`;
    getAllData(url, 1).then(function(data){
        jobSkills[jobId] = data.filter(action => action.IsRoleAction === 0);
        roleSkills[jobId] = data.filter(action => action.IsRoleAction === 1);
        $(`#jobSkillsListGCD`).empty();
        $(`#jobSkillsListOGCD`).empty();
        $(`#generalActions`).empty();
        $.each(jobSkills[jobId], function(_, skill) {
            if (skill.IsPlayerAction == "1" || skillsWhitelist.includes(skill.ID)) {
                if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {
                    if (!ogcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                        let imageGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="job">`);
                        $(`#jobSkillsListGCD`).append(imageGCD);
                    }
                    else if (ogcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                        let imageOGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="job" data-ogcd="true">`);
                        $(`#jobSkillsListOGCD`).append(imageOGCD);
                    }
                    
                    //if (skill.ActionCombo.ID !== "null") {
                        // Sort said skill just after the comboed action
                        
                    //}
                }
                else if (skill.ActionCategory.Name === "Ability") {
                    if (!gcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                        let imageOGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="job" data-ogcd="true">`);
                        $(`#jobSkillsListOGCD`).append(imageOGCD);
                    }
                    else if (gcdOverrides.includes(skill.ID) && !skillsBlacklist.includes(skill.ID)) {
                        let imageGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="job">`);
                        $(`#jobSkillsListGCD`).append(imageGCD);
                    }
                }
            }
        });
        $(`#roleSkills`).empty();
        $.each(roleSkills[jobId], function (_, skill) {
            if (skill.ActionCategory.Name === "Ability") {
                let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="role" href="#" data-ogcd="true">`);                        
                $(`#roleSkills`).append(image);
            }
            // Weapponskill is mainly for futureproofing (tho unlikely)
            else if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {
                let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="role" href="#">`);                        
                $(`#roleSkills`).append(image);
            }
        });
        $.each(globalSkillsList, function (_, skill) {
            // If it's AutoAttack or Sprint or Potion: OGCD
            if (skill.ID == 7 || skill.ID == 3 || skill.Name.includes("Tincture")) {
                let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="global" href="#" data-ogcd="true">`);                        
                $(`#generalActions`).append(image);
            }
            // If it's Limit Break: GCD
            else if (skill.ID == 209) {
                let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="global" href="#">`);                        
                $(`#generalActions`).append(image);
            }
            // If it's Pull (Placeholder)
            else if (skill.ID == 0) {
                let image = $(`<img class="imgHover" src="${skill.Icon}" width="20" height="60" data-id=${skill.ID} data-type="global" href="#">`);                        
                $(`#generalActions`).append(image);
            }
            // If it's GCD placeholder
            else if (skill.ID == 1) {
                let image = $(`<img class="imgHover" src="${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="global" href="#">`);                        
                $(`#generalActions`).append(image);
            }
            // If it's OGCD placeholder
            else if (skill.ID == 2) {
                let image = $(`<img class="imgHover" src="${skill.Icon}" width="40" height="40" data-id=${skill.ID} data-type="global" href="#" data-ogcd="true">`);                        
                $(`#generalActions`).append(image);
            }
        });
        $(".imgHover").hover(function(){
            let skill = {};
            switch($(this).data("type")){
                case "job":
                    skill = jobSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                    break;
                case "role":
                    skill = roleSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                    break;
                case "global":
                        skill = globalSkillsList.find(skill => skill.ID === $(this).data("id"));
                        break;
                default:
                    //This scenario shouldn't happen
                    skill = jobSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                    break;
            }
            let recast = skill.Recast100ms/10;
            let tooltip = $(
                `
                <span id="SkillNameTooltip">${skill.Name}</span>
                <p>${skill.Description}</p>
                <span>Recast: ${recast} Seonds</span>
                `
            );
            $(`.skillTooltipCol`).empty();
            $(`.skillTooltipCol`).append(tooltip);
        });
        $(".imgHover").click(function(){
            $(this)
                .clone()
                .attr("id", `timeline-${$(this).data("id")}`)
                .addClass(`${$(this).data("ogcd") ? "ogcd" : ""}`)
                .click(function() {
                    $(this).remove();
                })
                .appendTo($(`#rotationActual`));
                $(".imgHover").hover(function(){
                    let skill = {};
                    switch($(this).data("type")){
                        case "job":
                            skill = jobSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                            break;
                        case "role":
                            skill = roleSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                            break;
                        case "global":
                                skill = globalSkillsList.find(skill => skill.ID === $(this).data("id"));
                                break;
                        default:
                            //This scenario shouldn't happen
                            skill = jobSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
                            break;
                    }
                    let recast = skill.Recast100ms/10;
                    let tooltip = $(
                        `
                        <span id="SkillNameTooltip">${skill.Name}</span>
                        <p>${skill.Description}</p>
                        <span>Recast: ${recast} Seonds</span>
                        `
                    );
                    $(`.skillTooltipCol`).empty();
                    $(`.skillTooltipCol`).append(tooltip);
                });
        });
    });
}

function getAllData(uri, page) {
    let fullUrl = `${uri}${(page || 1)}`;
    return $.ajax({
        url:fullUrl,
        method:'get',
        dataType:'JSON'
    }).then(function(data){
        if (page < data.Pagination.PageTotal) {
            return getAllData(uri, page + 1)
            .then(function (more) {
                return data.Results.concat(more);
            });
        }
        return data.Results;
    });
}

function ClearBtn() {
    $("#rotationActual").empty();
}

function SecretSetting() {
    if (MoxSetting) {
        MoxSetting = false;
        $("#SSS").css("border-color", "red");
    }
    else {    
        MoxSetting = true;
        $("#SSS").css("border-color", "#5AC629");
    }
}

function ShowBuffWindow(BuffName, BuffColor) {
    let buffBar = 
        `<div id="Parent${BuffName}">
            <div id="${BuffName}" style="background-color:${BuffColor}" class="BuffBar" class="ui-draggable ui-draggable-handle">${BuffName}</div>
        </div>`;
    $(`#wrapDivRotation`).prepend(buffBar);
    $(`.BuffBar`)
        .resizable({
            ghost: true,
            handles: "e, w"
        })
        .draggable({containment: "parent"})
        .sortable();
    let selection = $(`.BuffBar`).id;
    $(`#BuffSelect`).append(selection);
}

function BuffPickerDialog() {
    let BuffPicker = 
        `<div id="DivPick">
            <input type="text" id="buffName" placeholder="Enter the name of the buff">
            <input type="color" id="buffColor" value="#ff0000">
        </div>`;
    $(`.container`).append(BuffPicker);
    $(`#DivPick`).dialog({
        buttons: [
            {
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            },
            {
                text: "Ok",
                click: function() {
                    let BuffName = $(`#buffName`).val();
                    if (BuffName !== "") {
                        let BuffColor = $(`#buffColor`).val();
                        ShowBuffWindow(BuffName, BuffColor);
                        let buffList = `<option>${BuffName}</option>`;
                        $(`#BuffSelect`).append(buffList);
                        $(this).dialog("destroy").remove();
                    }
                    else {
                        alert("Please enter a Buff Name");
                    }
                }
            },
        ],
    })
}

function DeleteBuffBar() {
    if($(`#BuffSelect`).children("option:selected").val() != "Buff List") {
        let buff = $(`#BuffSelect`).children("option:selected").val();
        $(`Div[id="Parent${buff}"]`).remove();
        $(`#BuffSelect`).children("option:selected").remove();
    }
}
