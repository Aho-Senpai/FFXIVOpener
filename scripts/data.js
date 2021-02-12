// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const gcdOverrides = [
	// DNC
    15997, //standard step
	15998, 15999, 16000, 16001, //technical step
	16002, //step actions
	16003, //standard finish
	16004, //technical finish
	16191, //single standard finish
	16192, //double standard finish (WHY IS IT LIKE THIS)
	16193, //single technical finish
	16194, //double technical finish
	16195, //triple technical finish
	16196, //quadruple technical finish
    // MCH
	7418, //flamethrower
    // NIN
	2259, 18805, //ten
	2261, 18806, //chi
	2263, 18807, //jin
	2265, 18873, 18874, 18875, //fuma shurikan
	2266, 18876, //katon
	2267, 18877, //raiton
	2268, 18878, //hyoton
	2269, 18879, //huton
	2270, 18880, //doton
	2271, 18881, //suiton
    2272, //rabbit medium
	16492, //hyosho ranryu
	16491, //goka meykakku
    // SAM
    16483, //Tsubame-Gaeshi
    16484, //kaeshi higanbana
	16485, //kaeshi goken
	16486, //kaeshi setsugekka
];
// Thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js
const ogcdOverrides = [
    // BRD
    114, //bard MB
	116, //bard AP
	3559, //bard WM
];

const globalSkillsList = [
    {
        ID: 1,
        Icon: "./resources/BlankGCD.png",
        Name: "GCD Blank Placeholder",
        Description: "This is a placeholder for a GCD",
    },
    {
        ID: 2,
        Icon: "./resources/BlankOGCD.png",
        Name: "OGCD Blank Placeholder",
        Description: "This is a placeholder for a OGCD",
    },
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
        ID: 0,
        Icon: "./resources/Pull1.png",
        Name: "Pull Placeholder",
        Description: "This is a placeholder for the Pull/Engage",
    },
    //Tinctures go there, to change if needed
    {
        ID: 27786,
        Icon: "/i/020000/020710.png",
        Name: "Tincture of Strength",
        Description: "This diluted brew temporarily increases strength for twice the duration of similar potions.\n\n\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s",
    },
    {
        ID: 27787,
        Icon: "/i/020000/020709.png",
        Name: "Tincture of Dexterity",
        Description: "This diluted brew temporarily increases dexterity for twice the duration of similar potions.\n\n\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s",
    },
    {
        ID: 27788,
        Icon: "/i/020000/020707.png",
        Name: "Tincture of Vitality",
        Description: "This diluted brew temporarily increases vitality for twice the duration of similar potions.\n\n\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s",
    },
    {
        ID: 27789,
        Icon: "/i/020000/020706.png",
        Name: "Tincture of Inteligence",
        Description: "This diluted brew temporarily increases inteligence for twice the duration of similar potions.\n\n\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s",
    },
    {
        ID: 27790,
        Icon: "/i/020000/020708.png",
        Name: "Tincture of Mind",
        Description: "This diluted brew temporarily increases mind for twice the duration of similar potions.\n\n\n\n<span style=\"color:#00cc22;\">Duration:</span> 30s",
    },
];

const skillsBlacklist = [
    18805, 18806, 18807, //NIN Mudras with "bad" Skill Description
    19238, 19239, 19240, //BLU Aetherial Mimickery with "bad" Skill Desc
];

const skillsWhitelist = [
    // NIN
    2265, //Fuma
    2266, //Katon
    2267, //Raiton
    2268, //Hyoton
    2269, //Huton
    2270, //Doton
    2271, //Suiton
    2272, //Rabbit Medium
	16491, //goka meykakku
    16492, //hyosho ranryu
    // MNK
    3547, //Forbidden Chacra
    // AST
    4401, //Balance
    4402, //Arrow
    4403, //Spear
    4404, //Bole
    4405, //Ewer
    4406, //Spire
    7444, //Lord
    7445, //Lady
    // SAM
    7487, //Midare
    7488, //Tenka Goken
    7489, //Higanbana
    16484, //Kaeshi: Higanbana
    16485, //Kaeshi: Goken
    16486, //Kaeshi: Setsugekka
    // DNC
    15999, //Emboite
    16000, //Entrechat
    16001, //Jete
    16002, //Pirouette
    16003, //Standard Finish
    16004, //Technical Finish
    18073, //Ending
    // RDM
    7527, //Enchanted Ripost
    7528, //Enchanted Zwerchhau
    7529, //Enchanted Redoublement
    7530, //Enchanted Moulinet
    7525, //Verflare
    7526, //Verfire
    16528, //Enchanted Reprise
    16530, //Scorch
    // SMN
    7426, //Ruin IV
    16513, //Firebird Trance
    16514, //Fountain of Fire
    16515, //Brand of Purgatory
    16516, //Enkindle Phoenix
    16517, //Everlasting Flight
    16791, //Assault I: Glittering Topaz	Action		
    16792, //Assault II: Shining Topaz	Action		
    16793, //Assault I: Downburst	Action		
    16794, //Assault II: Glittering Emerald	Action		
    16795, //Assault I: Earthen Armor	Action		
    16796, //Assault II: Mountain Buster	Action		
    16797, //Assault I: Aerial Slash	Action		
    16798, //Assault II: Slipstream	Action		
    16799, //Assault I: Crimson Cyclone	Action		
    16800, //Assault II: Flaming Crush
    // GNB
    16156, //Jugular Rip
    16157, //Abdomen Tear
    16158, //Eye Gouge
    // DRG
    7400, //Nastrond
    16479, //Raiden Thrust
    // WAR
    16463, //Chaotic Cyclone
    16465, //Inner Chaos
    // MCH
    16766, //Detonator
    // BLU
    23268, //White Death
    23274, //Divine Cataract (Chelonian Gate Second Hit)
    23289, //Fantom Flurry (Second Hit)

];