// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const gcdOverrides = [
	15997, //standard step
	15998, //technical step
	15999,
	16000,
	16001,
	16002, //step actions
	16003, //standard finish
	16004, //technical finish
	16191, //single standard finish
	16192, //double standard finish (WHY IS IT LIKE THIS)
	16193, //single technical finish
	16194, //double technical finish
	16195, //triple technical finish
	16196, //quadruple technical finish
	7418, //flamethrower
	16484, //kaeshi higanbana
	16485, //kaeshi goken
	16486, //kaeshi setsugekka
	2259, //ten
	18805, 
	2261, //chi
	18806,
	2263, //jin
	18807,
	2265, //fuma shurikan
	18873,
	18874,
	18875,
	2267, //raiton
	18877,
	2266, //katon
	18876,
	2268, //hyoton
	18878,
	16492, //hyosho ranryu
	16491, //goka meykakku
	2270, //doton
	18880,
	2269, //huton
	18879,
	2271, //suiton
	18881,
    2272, //rabbit medium
    16483, //Tsubame-Gaeshi
];
// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const ogcdOverrides = [
	3559, //bard WM
	116, //bard AP
	114 //bard MB
];

const globalSkillsList = [
    {
        ID: 7,
        Icon: "/i/000000/000101.png",
        Name: "Auto-Attack",
        Description: "This is an Auto-Attack.<br>Really, that's all.",
    },
    {
        ID: 209,
        Icon: "/i/000000/000103.png",
        Name: "Limit Break",
        Description: "Limit Break.<br>Not sure why you are using that in an opener.",
    },
    {
        ID: 3,
        Icon: "/i/000000/000104.png",
        Name: "Sprint",
        Description: "Sprint.<br>Makes you run fast.<br>WHAT ELSE DO YOU WANT?",
        Recast100ms: 600,
    },
    {
        ID: 4610,
        Icon: "/i/020000/020707.png",
        Name: "Potion",
        Description: "This is a placeholder for your Infusion/Tincture.</br>The recast assumes you are using HQ.",
        Recast100ms: 2700,
    },
    {
        ID: 0,
        Icon: "./resources/Pull1.png",
        Name: "Pull Placeholder",
        Description: "This is a placeholder for the Pull/Engage",
    }
];

const skillsBlacklist = [
    18805, //NIN Mudras with "bad" Skill Description
    18806,
    18807,
    19238, //BLU Aetherial Mimickery with "bad" Skill Desc
    19239,
    19240
];

const skillsWhitelist = [
    2265, //Fuma
    2267, //Raiton
    2268, //Hyoton
    2269, //Huton
    2270, //Doton
    2271, //Suiton
	16491, //goka meykakku
    16492, //hyosho ranryu
    3547, //Forbidden Chacra
    4401, //Balance
    4402, //Arrow
    4403, //Spear
    4404, //Bole
    4405, //Ewer
    4406, //Spire
    7444, //Lord
    7445, //Lady
    7487, //Midare
    7488, //Tenka Goken
    7489, //Higanbana
    16484, //Kaeshi: Higanbana
    16485, //Kaeshi: Goken
    16486, //Kaeshi: Setsugekka
    15999, //Emboite
    16000, //Entrechat
    16001, //Jete
    16002, //Pirouette
    16003, //Standard Finish
    16004, //Technical Finish
    7527, //Enchanted Ripost
    7528, //Enchanted Zwerchhau
    7529, //Enchanted Redoublement
    16528, //Enchanted Reprise
    7525, //Verflare
    7526, //Verfire
    16530, //Scorch
    16513, //Firebird Trance
    16514, //Fountain of Fire
    16515, //Brand of Purgatory
    16516, //Enkindle Phoenix
    16517, //Everlasting Flight
    16156, //Jugular Rip
    16157, //Abdomen Tear
    16158, //Eye Gouge
    7400, //Nastrond
    16465, //Inner Chaos
    16463, //Chaotic Cyclone
];

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
            let image = $(`<img src="https://xivapi.com${job.Icon}" width=40 height=40>`);
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
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${shorthand}=1,IsPvP=0,ActionCategory.ID%3E=2,ActionCategory.ID%3C=4&columns=ID,Icon,Name,Url,Description,Cast100ms,Recast100ms,Range,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction,IsPlayerAction&Limit=250&page=`;
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
            if (skill.ID == 7 || skill.ID == 3 || skill.ID == 4610) {
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
            let tooltip = $(`
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
        `<div>
            <div id="${BuffName}" class="BuffBar" class="ui-draggable ui-draggable-handle">${BuffName}</div>
        </div>`;
    $(`#rotationDiv`).prepend(buffBar);
    $(`.BuffBar`).draggable({containment: "parent"}).css("background-color", `${BuffColor}`);
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
                    var BuffName = $(`#buffName`).val();
                    if (BuffName !== "") {
                        let BuffColor = $(`#buffColor`).val();
                        ShowBuffWindow(BuffName, BuffColor);
                        let buffList = `<option>${BuffName}</option>`;
                        $(`#BuffSelect`).append(buffList);
                        $(this).dialog("close");
                        console.log($(`#buffName`).val());
                    }
                    else {
                        alert("Please enter a Buff Name");
                    }
                }
            },
        ],
    })
}
