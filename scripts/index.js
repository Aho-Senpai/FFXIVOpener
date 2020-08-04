// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const gcdOverrides = new Set([
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
	16471, //goka meykakku
	2270, //doton
	18880,
	2269, //huton
	18879,
	2271, //suiton
	18881,
	2272, //rabbit medium
])
// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const ogcdOverrides = new Set([
	3559, //bard WM
	116, //bard AP
	114 //bard MB
])

const globalSkillsList = new Set([
    "https://www.xivapi.com/i/000000/000101.png",
    "https://www.xivapi.com/i/000000/000103.png",
    "https://www.xivapi.com/i/000000/000104.png",
    "https://www.xivapi.com/i/020000/020707.png"
])

let jobList = [];
let jobSkills = {};
let roleSkills = {};
let currentJobId = 0;

$(function() {
    $.getJSON('https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation', function(data) {
        $.each(data.Results, function (_, job) {
            if(job.IsLimitedJob === 1){
                job.Role = 5;
            }
            if(job.ItemSoulCrystalTargetID === 0) return;
            let classJobCategoryIds = [30, 31];
            if(!classJobCategoryIds.includes(job.ClassJobCategory.ID)) return;
            if(job.Role === 3 && job.ClassJobCategory.ID === 31) job.Role = 6;
            jobList.push(job);
        });
        let roleSortOrder = [1, 4, 2, 3, 6, 5]; // 1 Tank, 4 Healer, 2 Melee, 3 Ranged, 6 Custom Ranged Magic, 5 Custom Limited Job 
        jobList.sort(function(a,b){
            if(a.Role == b.Role) return a.Role - b.Role;
            return roleSortOrder.indexOf(a.Role) - roleSortOrder.indexOf(b.Role);
        });                    
        $.each(jobList, function (_, job) {
            let image = $(`<img src="https://xivapi.com${job.Icon}" width=40 height=40>`);
            let link = $("<a></a>").attr("id", `job-${job.ID}`).attr("href", "#").attr("data-id", job.ID).append(image);
            let clickableImage = $(`<img src="https://xivapi.com${job.Icon}" width=40 height=40>`);
            $(`#role-${job.Role}`).append(link);
            link.click(function(element){
                getJobSkills($(this).data("id"));
                currentJobId = job.ID;
            });
        });
    });
    for(const skill of globalSkillsList) {
        let image = $(`<img src="${skill}" width=40 height=40>`);
        let link = $("<a></a>").attr("id", `generalSkillButton`).attr("href", "#").append(image);
        $(`#generalActions`).append(link);
        link.click(function(element){
            (link).clone().appendTo($(`#rotationActual`));
        })
    };
});

function getJobSkills(jobId) {
    let shorthand = jobList.find(x => x.ID === jobId).Abbreviation
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${shorthand}=1,IsPvP=0,IsPlayerAction=1&columns=ID,Icon,Name,Url,Description,Cast100ms,Recast100ms,Range,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction&page=`;
    getAllData(url, 1).then(function(data){
        jobSkills[jobId] = data.filter(action => action.IsRoleAction === 0);
        roleSkills[jobId] = data.filter(action => action.IsRoleAction === 1);
        $(`#jobSkillsListGCD`).empty();
        $(`#jobSkillsListOGCD`).empty();
        $.each(jobSkills[jobId], function(_, skill) {
            if (skill.ActionCategory.Name === "Spell" ||skill.ActionCategory.Name === "Weaponskill") {
                let imageGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);
                $(`#jobSkillsListGCD`).append(imageGCD);
            }
            else if (gcdOverrides.has(skill.ID)) {
                let imageGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);
                $(`#jobSkillsListGCD`).append(imageGCD);
            }
            
            if (skill.ActionCategory.Name === "Ability") {
                let imageOGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);
                $(`#jobSkillsListOGCD`).append(imageOGCD);
            }
            else if (ogcdOverrides.has(skill.ID)) {
                let imageOGCD = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);
                $(`#jobSkillsListOGCD`).append(imageOGCD);
            }
        });
        $(`#roleSkills`).empty();
        $.each(roleSkills[jobId], function (_, skill) {
            let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);                        
            $(`#roleSkills`).append(image);
        });
        $(".imgHover").hover(function(){
            let skill = jobSkills[currentJobId].find(skill => skill.ID === $(this).data("id"));
            let tooltip = $(`
            <span id="SkillNameTooltip">${skill.Name}</span>
            <p>${skill.Description}</p>`
            );
            $(`.skillTooltipCol`).empty();
            $(`.skillTooltipCol`).append(tooltip);
        });
        $(".imgHover").click(function(){ 
            $(this).clone().appendTo($(`#rotationActual`));
            console.log("hi");
        })
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




/*
$.each(jobSkills[jobId], function (_, skill) {
    let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);                        
    $(`#jobSkillsListGCD`).append(image);
});*/
