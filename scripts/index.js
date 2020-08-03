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
        let roleSortOrder = [1, 4, 2, 3, 6, 5]; // 1 Tank, 4 Healer, 2 Melee, 3 Ranged, 5 Custom Limited Job 6 Custom Ranged Magic
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
                currentJobId = $(job.ID);
            });
        });
    });
});

function getJobSkills(jobId) {
    let shorthand = jobList.find(x => x.ID === jobId).Abbreviation
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${shorthand}=1,IsPvP=0,IsPlayerAction=1&columns=ID,Icon,Name,Url,Description,Cast100ms,Recast100ms,Range,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction&page=`;
    getAllData(url, 1).then(function(data){
        jobSkills[jobId] = data.filter(action => action.IsRoleAction === 0);
        roleSkills[jobId] = data.filter(action => action.IsRoleAction === 1);
        $(`#jobSkillsListGCD`).empty();
        $.each(jobSkills[jobId], function (_, skill) {
            let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40" data-id=${skill.ID}>`);                        
            $(`#jobSkillsListGCD`).append(image);
        });
        $(`#roleSkills`).empty();
        $.each(roleSkills[jobId], function (_, skill) {
            let image = $(`<img class="imgHover" src="https://xivapi.com${skill.Icon}" width="40" height="40">`);                        
            $(`#roleSkills`).append(image);
        });
        $(".imgHover").hover(function(_, skill){
            console.log("hi");
            let tooltip = $(`<p>${jobSkills[currentJobId].filter(skill => skill.ID === $(this).data("id"))}</p>`);
            $(`.skillTooltipCol`).append(tooltip);
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