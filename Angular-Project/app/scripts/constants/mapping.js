/*
* provides object to map region ids tp their names and champion id to their names
*/
angular.module('riot')
.constant('Mapping', {

	"regions": {
		"na": "North America",
		"euw": "EU West",
		"eun": "EU Nordic & East",
		"lan": "Latin America North",
		"las": "Latin America South",
		"br": "Brazil",
		"jp": "Japan",
		"ru": "Russia",
		"tr": "Turkey",
		"oce": "Oceania",
		"kr": "Republic of Korea"
	},

	"champions": {
		"35": {
			id: "Shaco",
			displayName: "Shaco",
			championImageCount: "7"
		},
		"36": {
			id: "DrMundo",
			displayName: "Dr. Mundo",
			championImageCount: "8"
		},
		"33": {
			id: "Rammus",
			displayName: "Rammus",
			championImageCount: "7"
		},
		"34": {
			id: "Anivia",
			displayName: "Anivia",
			championImageCount: "6"
		},
		"39": {
			id: "Irelia",
			displayName: "Irelia",
			championImageCount: "5"
		},
		"157": {
			id: "Yasuo",
			displayName: "Yasuo",
			championImageCount: "3"
		},
		"37": {
			id: "Sona",
			displayName: "Sona",
			championImageCount: "7"
		},
		"38": {
			id: "Kassadin",
			displayName: "Kassadin",
			championImageCount: "5"
		},
		"154": {
			id: "Zac",
			displayName: "Zac",
			championImageCount: "5"
		},
		"150": {
			id: "Gnar",
			displayName: "Gnar",
			championImageCount: "3"
		},
		"43": {
			id: "Karma",
			displayName: "Karma",
			championImageCount: "5"
		},
		"42": {
			id: "Corki",
			displayName: "Corki",
			championImageCount: "7"
		},
		"41": {
			id: "Gangplank",
			displayName: "Gangplank",
			championImageCount: "7"
		},
		"40": {
			id: "Janna",
			displayName: "Janna",
			championImageCount: "6"
		},
		"202": {
			id: "Jhin",
			displayName: "Jhin",
			championImageCount: "1"
		},
		"203": {
			id: "Kindred",
			displayName: "Kindred",
			championImageCount: "1"
		},
		"201": {
			id: "Braum",
			displayName: "Braum",
			championImageCount: "3"
		},
		"22": {
			id: "Ashe",
			displayName: "Ashe",
			championImageCount: "7"
		},
		"23": {
			id: "Tryndamere",
			displayName: "Tryndamere",
			championImageCount: "8"
		},
		"24": {
			id: "Jax",
			displayName: "Jax",
			championImageCount: "12"
		},
		"25": {
			id: "Morgana",
			displayName: "Morgana",
			championImageCount: "10"
		},
		"26": {
			id: "Zilean",
			displayName: "Zilean",
			championImageCount: "5"
		},
		"27": {
			id: "Singed",
			displayName: "Singed",
			championImageCount: "7"
		},
		"28": {
			id: "Evelynn",
			displayName: "Evelynn",
			championImageCount: "4"
		},
		"29": {
			id: "Twitch",
			displayName: "Twitch",
			championImageCount: "7"
		},
		"3": {
			id: "Galio",
			displayName: "Galio",
			championImageCount: "5"
		},
		"161": {
			id: "Velkoz",
			displayName: "Vel'Koz",
			championImageCount: "3"
		},
		"2": {
			id: "Olaf",
			displayName: "Olaf",
			championImageCount: "5"
		},
		"1": {
			id: "Annie",
			displayName: "Annie",
			championImageCount: "10"
		},
		"30": {
			id: "Karthus",
			displayName: "Karthus",
			championImageCount: "8"
		},
		"7": {
			id: "Leblanc",
			displayName: "LeBlanc",
			championImageCount: "5"
		},
		"6": {
			id: "Urgot",
			displayName: "Urgot",
			championImageCount: "3"
		},
		"32": {
			id: "Amumu",
			displayName: "Amumu",
			championImageCount: "8"
		},
		"5": {
			id: "XinZhao",
			displayName: "Xin Zhao",
			championImageCount: "6"
		},
		"31": {
			id: "Chogath",
			displayName: "Cho'Gath",
			championImageCount: "6"
		},
		"4": {
			id: "TwistedFate",
			displayName: "Twisted Fate",
			championImageCount: "9"
		},
		"9": {
			id: "FiddleSticks",
			displayName: "Fiddlesticks",
			championImageCount: "8"
		},
		"8": {
			id: "Vladimir",
			displayName: "Vladimir",
			championImageCount: "7"
		},
		"19": {
			id: "Warwick",
			displayName: "Warwick",
			championImageCount: "8"
		},
		"17": {
			id: "Teemo",
			displayName: "Teemo",
			championImageCount: "8"
		},
		"18": {
			id: "Tristana",
			displayName: "Tristana",
			championImageCount: "10"
		},
		"15": {
			id: "Sivir",
			displayName: "Sivir",
			championImageCount: "8"
		},
		"16": {
			id: "Soraka",
			displayName: "Soraka",
			championImageCount: "6"
		},
		"13": {
			id: "Ryze",
			displayName: "Ryze",
			championImageCount: "9"
		},
		"14": {
			id: "Sion",
			displayName: "Sion",
			championImageCount: "5"
		},
		"11": {
			id: "MasterYi",
			displayName: "Master Yi",
			championImageCount: "9"
		},
		"12": {
			id: "Alistar",
			displayName: "Alistar",
			championImageCount: "8"
		},
		"21": {
			id: "MissFortune",
			displayName: "Miss Fortune",
			championImageCount: "8"
		},
		"20": {
			id: "Nunu",
			displayName: "Nunu",
			championImageCount: "7"
		},
		"107": {
			id: "Rengar",
			displayName: "Rengar",
			championImageCount: "3"
		},
		"106": {
			id: "Volibear",
			displayName: "Volibear",
			championImageCount: "4"
		},
		"105": {
			id: "Fizz",
			displayName: "Fizz",
			championImageCount: "8"
		},
		"104": {
			id: "Graves",
			displayName: "Graves",
			championImageCount: "6"
		},
		"103": {
			id: "Ahri",
			displayName: "Ahri",
			championImageCount: "6"
		},
		"102": {
			id: "Shyvana",
			displayName: "Shyvana",
			championImageCount: "5"
		},
		"99": {
			id: "Lux",
			displayName: "Lux",
			championImageCount: "6"
		},
		"101": {
			id: "Xerath",
			displayName: "Xerath",
			championImageCount: "4"
		},
		"412": {
			id: "Thresh",
			displayName: "Thresh",
			championImageCount: "4"
		},
		"98": {
			id: "Shen",
			displayName: "Shen",
			championImageCount: "6"
		},
		"96": {
			id: "KogMaw",
			displayName: "Kog'Maw",
			championImageCount: "8"
		},
		"222": {
			id: "Jinx",
			displayName: "Jinx",
			championImageCount: "3"
		},
		"223": {
			id: "TahmKench",
			displayName: "Tahm Kench",
			championImageCount: "2"
		},
		"92": {
			id: "Riven",
			displayName: "Riven",
			championImageCount: "6"
		},
		"91": {
			id: "Talon",
			displayName: "Talon",
			championImageCount: "4"
		},
		"90": {
			id: "Malzahar",
			displayName: "Malzahar",
			championImageCount: "5"
		},
		"10": {
			id: "Kayle",
			displayName: "Kayle",
			championImageCount: "7"
		},
		"429": {
			id: "Kalista",
			displayName: "Kalista",
			championImageCount: "2"
		},
		"421": {
			id: "RekSai",
			displayName: "Rek'Sai",
			championImageCount: "2"
		},
		"420": {
			id: "Illaoi",
			displayName: "Illaoi",
			championImageCount: "1"
		},
		"89": {
			id: "Leona",
			displayName: "Leona",
			championImageCount: "8"
		},
		"117": {
			id: "Lulu",
			displayName: "Lulu",
			championImageCount: "5"
		},
		"79": {
			id: "Gragas",
			displayName: "Gragas",
			championImageCount: "9"
		},
		"78": {
			id: "Poppy",
			displayName: "Poppy",
			championImageCount: "6"
		},
		"114": {
			id: "Fiora",
			displayName: "Fiora",
			championImageCount: "4"
		},
		"115": {
			id: "Ziggs",
			displayName: "Ziggs",
			championImageCount: "5"
		},
		"77": {
			id: "Udyr",
			displayName: "Udyr",
			championImageCount: "4"
		},
		"112": {
			id: "Viktor",
			displayName: "Viktor",
			championImageCount: "3"
		},
		"113": {
			id: "Sejuani",
			displayName: "Sejuani",
			championImageCount: "6"
		},
		"110": {
			id: "Varus",
			displayName: "Varus",
			championImageCount: "5"
		},
		"111": {
			id: "Nautilus",
			displayName: "Nautilus",
			championImageCount: "4"
		},
		"119": {
			id: "Draven",
			displayName: "Draven",
			championImageCount: "6"
		},
		"432": {
			id: "Bard",
			displayName: "Bard",
			championImageCount: "5"
		},
		"82": {
			id: "Mordekaiser",
			displayName: "Mordekaiser",
			championImageCount: "5"
		},
		"245": {
			id: "Ekko",
			displayName: "Ekko",
			championImageCount: "2"
		},
		"83": {
			id: "Yorick",
			displayName: "Yorick",
			championImageCount: "2"
		},
		"80": {
			id: "Pantheon",
			displayName: "Pantheon",
			championImageCount: "7"
		},
		"81": {
			id: "Ezreal",
			displayName: "Ezreal",
			championImageCount: "8"
		},
		"86": {
			id: "Garen",
			displayName: "Garen",
			championImageCount: "10"
		},
		"84": {
			id: "Akali",
			displayName: "Akali",
			championImageCount: "7"
		},
		"85": {
			id: "Kennen",
			displayName: "Kennen",
			championImageCount: "6"
		},
		"67": {
			id: "Vayne",
			displayName: "Vayne",
			championImageCount: "9"
		},
		"126": {
			id: "Jayce",
			displayName: "Jayce",
			championImageCount: "3"
		},
		"127": {
			id: "Lissandra",
			displayName: "Lissandra",
			championImageCount: "3"
		},
		"69": {
			id: "Cassiopeia",
			displayName: "Cassiopeia",
			championImageCount: "7"
		},
		"68": {
			id: "Rumble",
			displayName: "Rumble",
			championImageCount: "3"
		},
		"121": {
			id: "Khazix",
			displayName: "Kha'Zix",
			championImageCount: "3"
		},
		"122": {
			id: "Darius",
			displayName: "Darius",
			championImageCount: "8"
		},
		"120": {
			id: "Hecarim",
			displayName: "Hecarim",
			championImageCount: "5"
		},
		"72": {
			id: "Skarner",
			displayName: "Skarner",
			championImageCount: "4"
		},
		"236": {
			id: "Lucian",
			displayName: "Lucian",
			championImageCount: "6"
		},
		"74": {
			id: "Heimerdinger",
			displayName: "Heimerdinger",
			championImageCount: "5"
		},
		"75": {
			id: "Nasus",
			displayName: "Nasus",
			championImageCount: "9"
		},
		"238": {
			id: "Zed",
			displayName: "Zed",
			championImageCount: "3"
		},
		"76": {
			id: "Nidalee",
			displayName: "Nidalee",
			championImageCount: "8"
		},
		"134": {
			id: "Syndra",
			displayName: "Syndra",
			championImageCount: "4"
		},
		"59": {
			id: "JarvanIV",
			displayName: "Jarvan IV",
			championImageCount: "6"
		},
		"133": {
			id: "Quinn",
			displayName: "Quinn",
			championImageCount: "3"
		},
		"58": {
			id: "Renekton",
			displayName: "Renekton",
			championImageCount: "7"
		},
		"57": {
			id: "Maokai",
			displayName: "Maokai",
			championImageCount: "6"
		},
		"136": {
			id: "AurelionSol",
			displayName: "Aurelion Sol",
			championImageCount: "1"
		},
		"56": {
			id: "Nocturne",
			displayName: "Nocturne",
			championImageCount: "5"
		},
		"55": {
			id: "Katarina",
			displayName: "Katarina",
			championImageCount: "8"
		},
		"64": {
			id: "LeeSin",
			displayName: "Lee Sin",
			championImageCount: "10"
		},
		"62": {
			id: "MonkeyKing",
			displayName: "Wukong",
			championImageCount: "5"
		},
		"268": {
			id: "Azir",
			displayName: "Azir",
			championImageCount: "2"
		},
		"63": {
			id: "Brand",
			displayName: "Brand",
			championImageCount: "5"
		},
		"131": {
			id: "Diana",
			displayName: "Diana",
			championImageCount: "3"
		},
		"60": {
			id: "Elise",
			displayName: "Elise",
			championImageCount: "3"
		},
		"267": {
			id: "Nami",
			displayName: "Nami",
			championImageCount: "6"
		},
		"266": {
			id: "Aatrox",
			displayName: "Aatrox",
			championImageCount: "3"
		},
		"61": {
			id: "Orianna",
			displayName: "Orianna",
			championImageCount: "6"
		},
		"143": {
			id: "Zyra",
			displayName: "Zyra",
			championImageCount: "3"
		},
		"48": {
			id: "Trundle",
			displayName: "Trundle",
			championImageCount: "4"
		},
		"45": {
			id: "Veigar",
			displayName: "Veigar",
			championImageCount: "8"
		},
		"44": {
			id: "Taric",
			displayName: "Taric",
			championImageCount: "3"
		},
		"51": {
			id: "Caitlyn",
			displayName: "Caitlyn",
			championImageCount: "10"
		},
		"53": {
			id: "Blitzcrank",
			displayName: "Blitzcrank",
			championImageCount: "11"
		},
		"54": {
			id: "Malphite",
			displayName: "Malphite",
			championImageCount: "7"
		},
		"254": {
			id: "Vi",
			displayName: "Vi",
			championImageCount: "4"
		},
		"50": {
			id: "Swain",
			displayName: "Swain",
			championImageCount: "3"
		}
	}
});
