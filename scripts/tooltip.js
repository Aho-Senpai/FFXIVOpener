function showTooltip(Skill) {
    // TODO : make delay optional (settings?)
    const tip = document.getElementById("Tooltip")
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
    const tooltipElements = {
        "SkillTooltipName": Skill.Name,
        "SkillTooltipDesc": Skill.Description,
        "SkillTooltipCast": Skill.Cast !== undefined ? (Skill.Cast === 0 ? "Cast: Instant" : `Cast: ${Skill.Cast}s`) : undefined,
        "SkillTooltipRecast": Skill.Recast !== undefined ? `Recast: ${Skill.Recast}s` : undefined,
        "SkillTooltipRange": Skill.Range !== undefined ? `Range: ${Skill.Range}y` : undefined,
        "SkillTooltipRadius": Skill.Radius !== undefined ? `Radius: ${Skill.Radius}y` : undefined
    };
    Object.keys(tooltipElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const value = tooltipElements[id];
            if (value !== undefined) {
                element.style.display = "block";
                element.innerHTML = value;
            } else {
                element.style.display = "none";
            }
        }
    });
    //TODO: Add parsing of skill desc for adding color to combo actions and other
}

function clearTooltip() {
    const tooltips = [
        "SkillTooltipCast",
        "SkillTooltipRecast",
        "SkillTooltipRange",
        "SkillTooltipRadius"
    ];
    tooltips.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
        }
    });
    const tip = document.getElementById("Tooltip");
    if (tip) {
        tip.style.display = "none";
    }
}
