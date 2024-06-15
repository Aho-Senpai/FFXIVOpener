function showTooltip(Skill) {
    // TODO : Add a 1 second delay before showing tooltip?
    //console.log("tooltip on");
    let tip = document.getElementById("Tooltip")
    tip.style.display = "block";

    //TODO : Maybe logic to "flip" the div on the left side of cursor if too close to the right of screen?
    window.onmousemove = (e) => {
        tip.style.top = e.clientY + 20 + "px";
        // if e.clientX > 50% do marginRight instead?
        tip.style.marginLeft = e.clientX + 20 + "px";
    }
    getTooltipData(Skill);
}

function getTooltipData(Skill) {
    document.getElementById("SkillTooltipName").innerHTML = Skill.Name;
    document.getElementById("SkillTooltipDesc").innerHTML = Skill.Description;
    if (Skill.Cast !== undefined) {
        document.getElementById("SkillTooltipCast").style.display = "block";
        document.getElementById("SkillTooltipCast").innerHTML = `Cast: ${Skill.Cast}`;
    }
    if (Skill.Recast !== undefined) {
        document.getElementById("SkillTooltipRecast").style.display = "block";
        document.getElementById("SkillTooltipRecast").innerHTML = `Recast: ${Skill.Recast}`;
    }
    if (Skill.Range !== undefined) {
        document.getElementById("SkillTooltipRange").style.display = "block";
        document.getElementById("SkillTooltipRange").innerHTML = `Range: ${Skill.Range}`;
    }
    if (Skill.Radius !== undefined) {
        document.getElementById("SkillTooltipRadius").style.display = "block";
        document.getElementById("SkillTooltipRadius").innerHTML = `Radius: ${Skill.Radius}`;
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