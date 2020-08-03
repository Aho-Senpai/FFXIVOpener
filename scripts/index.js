//https://xivapi.com/classjob

let jobList = [];
$(function() {
    $.getJSON('https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID', function(data) {
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
                console.log(`You clicked on ${$(this).data("id")} you sly dog`);
            });
        });
    });                
});