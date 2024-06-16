function showTooltip(Skill) {
    // TODO : Add a 1 second delay before showing tooltip?
    //console.log("tooltip on");
    let tip = document.getElementById("Tooltip")
    tip.style.display = "block";

    //TODO : Maybe logic to "flip" the div on the left side of cursor if too close to the right of screen?
    window.onmousemove = (e) => {
        tip.style.top = e.clientY + 20 + "px";
        // if e.clientX > 50% do marginRight instead?
        //console.log(window.innerWidth);
        // console.log(e.clientX > window.innerWidth/2);
        // if (e.clientX > window.innerWidth/2) {
        //     tip.style.marginRight = (window.innerWidth-e.clientX) - 20 + "px";
        //     tip.style.marginLeft = (window.innerWidth - e.clientX) + "px";
        //     return;
        // }
        tip.style.marginLeft = e.clientX + 20 + "px";
        tip.style.marginRight = "0px";
    }
    getTooltipData(Skill);
}

function getTooltipData(Skill) {
    document.getElementById("SkillTooltipName").innerHTML = Skill.Name;
    document.getElementById("SkillTooltipDesc").innerHTML = Skill.Description;
    if (Skill.Cast !== undefined) {
        document.getElementById("SkillTooltipCast").style.display = "block";
        if (Skill.Cast == 0) {
            document.getElementById("SkillTooltipCast").innerHTML = `Cast: Instant`;
        }
        else {
            document.getElementById("SkillTooltipCast").innerHTML = `Cast: ${Skill.Cast}s`;
        }
    }
    if (Skill.Recast !== undefined) {
        document.getElementById("SkillTooltipRecast").style.display = "block";
        document.getElementById("SkillTooltipRecast").innerHTML = `Recast: ${Skill.Recast}s`;
    }
    if (Skill.Range !== undefined) {
        document.getElementById("SkillTooltipRange").style.display = "block";
        document.getElementById("SkillTooltipRange").innerHTML = `Range: ${Skill.Range}y`;
    }
    if (Skill.Radius !== undefined) {
        document.getElementById("SkillTooltipRadius").style.display = "block";
        document.getElementById("SkillTooltipRadius").innerHTML = `Radius: ${Skill.Radius}y`;
    }
    //TODO: Add parsing of skill desc for adding color to combo actions and other
}

function clearTooltip() {
    //console.log("tooltip off");
    let tip = document.getElementById("Tooltip")
    tip.style.display = "none";
    document.getElementById("SkillTooltipCast").style.display = "none";
    document.getElementById("SkillTooltipRecast").style.display = "none";
    document.getElementById("SkillTooltipRange").style.display = "none";
    document.getElementById("SkillTooltipRadius").style.display = "none";
}