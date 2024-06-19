// MEMO : Background Colors
// function jobSelectBackgroundColor(role) {
//     switch (role) {
//         case 1:
//             return "#425ABD"; //Tanks (Blue)
//         case 4:
//             return "#397B18"; // Healers (Green)
//         case 2: case 3: case 5: case 6:
//             return "#843131"; // DPS (Red)
//         default:
//             return "#FFFFFF"; // Others (White) <- Should not happen
//     }
// }

// Buttons Links
function discordBtn() {
    window.open("https://discord.gg/dPFSM53");
}
function githubBtn() {
    window.open("https://github.com/Aho-Senpai/FFXIVOpener");
}

//TODO : remove sortableJS dependency and implement sorting of timeline
//TODO: change background color of each raidbuff/selfbuff? custom edit thingy?
//TODO : add a "under level" category in GCD/OGCD lists?
//TODO : Ability to create custom raidbuff?
//TODO : default opener per job?
//TODO : SelfBuffs under rotation when adding a skill that has a self buff? or have a way to add a self buff manually?
//TODO : Settings menu prettier
//TODO : Fix tooltip issue when too close to right edge
//TODO : for share and settings "menus", make them close/hide when clicking outside the div
//TODO : chromium fix

//todo : feature request : https://discord.com/channels/277897135515762698/283058569471852546/740962443148394516
    // ^ make each GCD smaller and smaller if in a row (low priority)
//todo : localization