// MEMO : Background Colors
// "#425ABD"; //Tanks (Blue)
// "#397B18"; // Healers (Green)
// "#843131"; // DPS (Red)
// "#FFFFFF"; // Others (White) <- Should not happen


// Buttons Links
function discordBtn() {
    window.open("https://discord.gg/dPFSM53");
}
function githubBtn() {
    window.open("https://github.com/Aho-Senpai/FFXIVOpener");
}

//TODO : remove sortableJS dependency and implement sorting of timeline
//TODO : allow user to change raidbuff/selfbuff background color
//TODO : add a "under level" category in GCD/OGCD lists?
//TODO : Ability to create custom raidbuff?
//TODO : default opener per job?
//TODO : SelfBuffs under rotation when adding a skill that has a self buff? or have a way to add a self buff manually?
//TODO : Settings menu prettier
//TODO : Fix tooltip issue when too close to right edge
//TODO : for share and settings "menus", make them close/hide when clicking outside the div
//TODO : chromium fix : put jobselect back to using inputs instead of labels and fix chromium not displaying images in it
//     ^ Temp fix : switched input for label on job select
//TODO : investigate why chromium stops moving raidbuff bar if mouse leaves div (firefox doesn't)
//TODO : setting for image size? (css done, need button and JS side)
//TODO : when image size setting is done, make raidbuff default length depends on duration and image size
// raidbuff bar height depends on font size : setting for that?

//todo : feature request : https://discord.com/channels/277897135515762698/283058569471852546/740962443148394516
    // ^ make each GCD smaller and smaller if in a row (low priority)
//todo : localization (low priority)

//* <span style=\"color:#00cc22;\">Combo Action:</span> // Back to start of line : combo bonus or duration ...
//* <span style=\"color:#ee7318;\">Riot Blade</span> // Skill
//* <span style=\"color:#cccc52;\">Sword Oath</span> // Buff