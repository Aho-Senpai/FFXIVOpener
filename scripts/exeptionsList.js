//thanks to https://github.com/Rawrington/SkillDisplay/blob/master/src/Action.js

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

const ogcdOverrides = new Set([
	3559, //bard WM
	116, //bard AP
	114 //bard MB
])