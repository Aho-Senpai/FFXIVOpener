const tip = document.getElementById("Tooltip")
function showTooltip(Skill) {
    tip.style.display = "block";
    window.onmousemove = (e) => {
        setTooltipXPos(e);
        setTooltipYPos(e);
    }
    getTooltipData(Skill);
}
function setTooltipXPos(e) {
    if (!((window.innerWidth - (e.clientX + 20)) > tip.offsetWidth)) {
        tip.style.marginRight = (e.clientX - tip.offsetWidth) - 20 + "px";
        tip.style.marginLeft = (e.clientX - tip.offsetWidth ) - 20 + "px";
        return;
    }
    tip.style.marginLeft = e.clientX + 20 + "px";
    tip.style.marginRight = "0px";
}
function setTooltipYPos(e) {
    if ((window.innerHeight - e.clientY - 20) < tip.offsetHeight) {
        tip.style.top = (window.innerHeight - tip.offsetHeight) + "px";
        return;
    }
    tip.style.top = e.clientY + 20 + "px";
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
                if (id !== "SkillTooltipName") {
                    element.style.display = "block";
                }
                element.innerHTML = value;
            }
            else {
                if (id !== "SkillTooltipName") {
                    element.style.display = "none";
                }
            }
        }
    });
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
        if (!element) { return; }
        element.style.display = "none";
    });
    const tip = document.getElementById("Tooltip");
    if (!tip) { return; }
    tip.style.display = "none";
}
