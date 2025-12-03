let divOutput = document.getElementById("output");
let divPulled = document.getElementById("pulled");

const umaCharaIds = {
  1001: "Special Week",
  1002: "Silence Suzuka",
  1003: "Tokai Teio",
  1004: "Maruzensky",
  1005: "Fuji Kiseki",
  1006: "Oguri Cap",
  1007: "Gold Ship",
  1008: "Vodka",
  1009: "Daiwa Scarlet",
  1010: "Taiki Shuttle",
  1011: "Grass Wonder",
  1012: "Hishi Amazon",
  1013: "Mejiro McQueen",
  1014: "El Condor Pasa",
  1015: "T.M. Opera O",
  1016: "Narita Brian",
  1017: "Symboli Rudolf",
  1018: "Air Groove",
  1019: "Agnes Digital",
  1020: "Seiun Sky",
  1021: "Tamamo Cross",
  1022: "Fine Motion",
  1023: "Biwa Hayahide",
  1024: "Mayano Top Gun",
  1025: "Manhattan Cafe",
  1026: "Mihono Bourbon",
  1027: "Mejiro Ryan",
  1028: "Hishi Akebono",
  1029: "Yukino Bijin",
  1030: "Rice Shower",
  1031: "Ines Fujin",
  1032: "Agnes Tachyon",
  1033: "Admire Vega",
  1034: "Inari One",
  1035: "Winning Ticket",
  1036: "Air Shakur",
  1037: "Eishin Flash",
  1038: "Curren Chan",
  1039: "Kawakami Princess",
  1040: "Gold City",
  1041: "Sakura Bakushin O",
  1042: "Seeking the Pearl",
  1043: "Shinko Windy",
  1044: "Sweep Tosho",
  1045: "Super Creek",
  1046: "Smart Falcon",
  1047: "Zenno Rob Roy",
  1048: "Tosen Jordan",
  1049: "Nakayama Festa",
  1050: "Narita Taishin",
  1051: "Nishino Flower",
  1052: "Haru Urara",
  1053: "Bamboo Memory",
  1054: "Biko Pegasus",
  1055: "Marvelous Sunday",
  1056: "Matikanefukukitaru",
  1057: "Mr. C.B.",
  1058: "Meisho Doto",
  1059: "Mejiro Dober",
  1060: "Nice Nature",
  1061: "King Halo",
  1062: "Matikanetannhauser",
  1063: "Ikuno Dictus",
  1064: "Mejiro Palmer",
  1065: "Daitaku Helios",
  1066: "Twin Turbo",
  1067: "Satono Diamond",
  1068: "Kitasan Black",
  1069: "Sakura Chiyono O",
  1070: null,
  1071: "Mejiro Ardan",
  1072: "Yaeno Muteki",
  1073: null,
  1074: "Mejiro Bright",
  9001: "Tazuna Hayakawa",
  9002: "Director Akikawa",
  9003: "Etsuko Otonashi",
  9004: "Trainer Kiryuin",
  9005: "Sasami Anshinzawa",
  9006: "Riko Kashimoto"
};

const umaSupportIds = {
  10001: { name: "Special Week", stat: "g", title: "Tracen Academy", tier: null, count: 0},
  10002: { name: "Silence Suzuka", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10003: { name: "Tokai Teio", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10004: { name: "Maruzensky", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10005: { name: "Oguri Cap", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10006: { name: "Golden Ship", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10007: { name: "Vodka", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10008: { name: "Taiki Shuttle", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10009: { name: "Grass Wonder", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10010: { name: "Mejiro McQueen", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10011: { name: "El Condor Pasa", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10012: { name: "T.M. Opera O", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10013: { name: "Symboli Rudolf", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10014: { name: "Seiun Sky", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10015: { name: "Rice Shower", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10016: { name: "Winning Ticket", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10017: { name: "Gold City", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10018: { name: "Sakura Bakushin O", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10019: { name: "Super Creek", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10020: { name: "Haru Urara", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10021: { name: "Tazuna Hayakawa", stat: "pa", title: "Tracen Academy", tier: null, count: 0 },
  10022: { name: "Aoi Kiryuin", stat: "pa", title: "Tracen Academy", tier: null, count: 0 },
  10023: { name: "Daiwa Scarlet", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10024: { name: "Hishi Amazon", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10025: { name: "Air Groove", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10026: { name: "Agnes Digital", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10027: { name: "Tamamo Cross", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10028: { name: "Fine Motion", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10029: { name: "Biwa Hayahide", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10030: { name: "Mayano Top Gun", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10031: { name: "Manhattan Cafe", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10032: { name: "Mihono Bourbon", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10033: { name: "Mejiro Ryan", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10034: { name: "Yukino Bijin", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10035: { name: "Ines Fujin", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10036: { name: "Agnes Tachyon", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10037: { name: "Air Shakur", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10038: { name: "Eishin Flash", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10039: { name: "Smart Falcon", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10040: { name: "Narita Taishin", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10041: { name: "Nishino Flower", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10042: { name: "Biko Pegasus", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10043: { name: "Marvelous Sunday", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10044: { name: "Matikane Fukukitaru", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10045: { name: "Meisho Doto", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10046: { name: "Mejiro Dober", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10047: { name: "Nice Nature", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10048: { name: "King Halo", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10049: { name: "Fuji Kiseki", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10050: { name: "Sweep Tosho", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10051: { name: "Twin Turbo", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10052: { name: "Daitaku Helios", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10053: { name: "Ikuno Dictus", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10054: { name: "Mejiro Palmer", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10055: { name: "Kitasan Black", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10056: { name: "Satono Diamond", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10057: { name: "Matikane Tannhauser", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10058: { name: "Yaeno Muteki", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10059: { name: "Zenno Rob Roy", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10060: { name: "Riko Kashimoto Pal R", stat: "pa", title: "Tracen Academy", tier: null, count: 0 },
  10061: { name: "Seeking the Pearl", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10062: { name: "Sakura Chiyono O", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  10063: { name: "Kawakami Princess", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  10064: { name: "Hish Akebono", stat: "g", title: "Tracen Academy", tier: null, count: 0 },
  10065: { name: "Bamboo Memory", stat: "po", title: "Tracen Academy", tier: null, count: 0 },
  10066: { name: "Shinko Windy", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },
  //10067: { name: null, stat: null, title: null, tier: null },
  //10068: { name: null, stat: null, title: null, tier: null },
  10069: { name: "Mejiro Ardan", stat: "w", title: "Tracen Academy", tier: null, count: 0 },
  10070: { name: "Tosen Jordan", stat: "st", title: "Tracen Academy", tier: null, count: 0 },
  //10071: { name: null, stat: null, title: null, tier: null },
  10072: { name: "Narita Brian", stat: "sp", title: "Tracen Academy", tier: null, count: 0 },

  20001: { name: "Fuji Kiseki", stat: "w", title: "Well Look Who's Home", tier: null, count: 0 },
  20002: { name: "Daiwa Scarlet", stat: "w", title: "Nothing Hard Work Can't Solve!", tier: null, count: 0 },
  20003: { name: "Hishi Amazon", stat: "po", title: "Reach to the Top!", tier: null, count: 0 },
  20004: { name: "Air Groove", stat: "g", title: "Nothing Escapes the Vice Prez", tier: null, count: 0 },
  20005: { name: "Agnes Digital", stat: "po", title: "Digital's Recharge Station", tier: null, count: 0 },
  20006: { name: "Biwa Hayahide", stat: "po", title: "Trial Initiation", tier: null, count: 0 },
  20007: { name: "Mayano Top Gun", stat: "st", title: "Cute + Cute = ?", tier: null, count: 0 },
  20008: { name: "Manhattan Cafe", stat: "st", title: "My Solo Drawn to Raindrop Drums", tier: null, count: 0 },
  20009: { name: "Mihono Bourbon", stat: "po", title: "Pal-Assisted Training", tier: null, count: 0 },
  20010: { name: "Mejiro Ryan", stat: "po", title: "On and Off the Court", tier: null, count: 0 },
  20011: { name: "Yukino Bijin", stat: "g", title: "City Girl 101", tier: null, count: 0 },
  20012: { name: "Agnes Tachyon", stat: "w", title: "Experimental Studies on Subject A", tier: null, count: 0 },
  20013: { name: "Eishin Flash", stat: "sp", title: "5:00 AM - Right on Schedule", tier: null, count: 0 },
  20014: { name: "Narita Taishin", stat: "sp", title: "Poolside High Tides", tier: null, count: 0 },
  20015: { name: "Marvelous Sunday", stat: "w", title: "A Marvelous Plan", tier: null, count: 0 },
  20016: { name: "Matikane Fukukitaru", stat: "w", title: "Fate's Forecast", tier: null, count: 0 },
  20017: { name: "Meisho Doto", stat: "g", title: "Fighting for Fortune", tier: null, count: 0 },
  20018: { name: "Mejiro Dober", stat: "w", title: "Ignore the Stares", tier: null, count: 0 },
  20019: { name: "Nice Nature", stat: "g", title: "It's Just Water", tier: null, count: 0 },
  20020: { name: "King Halo", stat: "sp", title: "First-Rate Plan", tier: null, count: 0 },
  20021: { name: "Aoi Kiryuin", stat: "pa", title: "Trainer's Teamwork", tier: null, count: 0 },
    //20022: { name: null, stat: "pa", title: "Trainer's Teamwork", tier: null },
  20023: { name: "Sweep Tosho", stat: "sp", title: "Lamplit Training of a Witch-to-be", tier: null, count: 0 },
  20024: { name: "Daitaku Helios", stat: "po", title: "Let's Get This Party Lit!", tier: null, count: 0 },
  20025: { name: "Ikuno Dictus", stat: "w", title: "Never Skip Warm-Ups", tier: null, count: 0 },
  20026: { name: "Nice Nature", stat: "w", title: "Messing Around", tier: null, count: 0 },
  20027: { name: "Nishino Flower", stat: "po", title: "Lifting Your Spirits", tier: null, count: 0 },
  20029: { name: "Seeking the Pearl", stat: "g", title: "The World's My Oyster", tier: null, count: 0 },
    //20030: { name: null, stat: "g", title: "The World's My Oyster", tier: null, count: 0 },
  20031: { name: "Shinko Windy", stat: "sp", title: "///WARNING GATE///", tier: null, count: 0 },
  //20032: { name: null},
  //20033: { name: null},
  20034: { name: "Mejiro Ardan", stat: "w", title: "My Heart Will Go On", tier: null, count: 0 },
  20035: { name: "Tosen Jordan", stat: "st", title: "The Perfect Book for You", tier: null, count: 0 },

  30001: { name: "Special Week", stat: "g", title: "The Brightest Star in Japan", tier: null, count: 0 },
  30002: { name: "Silence Suzuka", stat: "sp", title: "Beyond This Shining Moment", tier: null, count: 0 },
  30003: { name: "Takai Teio", stat: "sp", title: "Dream Big!", tier: null, count: 0 },
  30004: { name: "Gold Ship", stat: "st", title: "Breakaway Battleship", tier: null, count: 0 },
  30005: { name: "Vodka", stat: "po", title: "Wild Rider", tier: null, count: 0 },
  30006: { name: "Grass Wonder", stat: "g", title: "Fairest Fleur", tier: null, count: 0 },
  30007: { name: "El Condor Pasa", stat: "po", title: "Champion's Passion", tier: null, count: 0 },
  30008: { name: "Seiun Sky", stat: "st", title: "Foolproof Plan", tier: null, count: 0 },
  30009: { name: "Tamamo Cross", stat: "st", title: "Split the Sky White Lightning!", tier: null, count: 0 },
  30010: { name: "Fine Motion", stat: "w", title: "Wave of Gratitude", tier: "s", count: 0 },
  30011: { name: "Ines Fujin", stat: "g", title: "Watch My Star Fly!", tier: null, count: 0 },
  30012: { name: "Winning Ticket", stat: "g", title: "BNWinner!", tier: null, count: 0 },
  30013: { name: "Air Shakur", stat: "w", title: "7 More Centimeters", tier: null, count: 0 },
  30014: { name: "Gold City", stat: "sp", title: "Run (my) way", tier: null, count: 0 },
  30015: { name: "Sakura Bakushin O", stat: "st", title: "Eat Fast! Yum Fast!", tier: null, count: 0 },
  30016: { name: "Super Creek", stat: "st", title: "Piece of Mind", tier: "s", count: 0 },
  30017: { name: "Smart Falcon", stat: "po", title: "My Umadol Way!", tier: null, count: 0 },
  30018: { name: "Nishino Flower", stat: "sp", title: "Even the Littlest Bud", tier: null, count: 0 },
  30019: { name: "Haru Urara", stat: "g", title: "Urara's Day Off", tier: null, count: 0 },
  30020: { name: "Biko Pegasus", stat: "s", title: "Double Carrot Punch!", tier: null, count: 0 },
  30021: { name: "Tazuna Hayakawa", stat: "pa", title: "Tracen Reception", tier: null, count: 0 },
  30022: { name: "Mejiro McQueen", stat: "st", title: "Your Team Ace", tier: null, count: 0 },
  30023: { name: "Rice Shower", stat: "st", title: "Showered in Joy", tier: null, count: 0 },
  30024: { name: "Oguri Cap", stat: null, title: "Get Lots of Hugs For Me", tier: null, count: 0 },
  30025: { name: "Special Week", stat: "sp", title: "The Setting Sun and Rising Stars", tier: null, count: 0 },
  30026: { name: "Twin Turbo", stat: "sp", title: "Turbo Booooost!", tier: null, count: 0 },
  30027: { name: "Mejiro Palmer", stat: "g", title: "Go Ahead and Laugh", tier: null, count: 0 },
  30028: { name: "Kitasan Black", stat: "sp", title: "Fire at My Heels", tier: "s", count: 0 },
  30029: { name: "Satono Diamond", stat: "st", title: "The Will to Overtake", tier: null, count: 0 },
  30030: { name: "Matikane Tannhauser", stat: "g", title: "Just Keep Going", tier: null, count: 0 },
  30031: { name: "Yukino Bijin", stat: "w", title: "Hometown Cheers", tier: null, count: 0 },
  30032: { name: "Yaeno Muteki", stat: "po", title: "Fiery Discipline", tier: null, count: 0 },
  30033: { name: "Winning Tickket", stat: "po", title: "Dreams Do Come True!", tier: null, count: 0 },
  30034: { name: "Rice Shower", stat: "po", title: "Happiness Just around the Bend", tier: null, count: 0 },
  //30035: { name: null, stat: null, title: null, tier: null },
  30036: { name: "Riko Kashimoto", stat: "pa", title: "Planned Perfection", tier: null , count: 0},
  //30037: { name: null, stat: null, title: null, tier: null },
  30038: { name: "Sakura Chiyono O", stat: "st", title: "Peak Sakura Season", tier: null, count: 0 },
  30039: { name: "Kawakami Princess", stat: "sp", title: "Princess Bride", tier: null, count: 0 },
  30040: { name: "Hishi Akebono", stat: "g", title: "Who Wants the First Bite?", tier: null , count: 0},
  30041: { name: "Mejiro Dober", stat: "w", title: "My Thoughts My Desires", tier: null, count: 0 },
  30042: { name: "Bamboo Memory", stat: "po", title: "Head-on Fight!", tier: null, count: 0 },
  //30043: { name: null, stat: null, title: null, tier: null },
  30044: { name: "Narita Brian", stat: "sp", title: "Two Pieces", tier: null, count: 0 },
  30045: { name: "Sweep Tosho", stat: "sp", title: "It's All Mine!", tier: null, count: 0 },
  30046: { name: "Winning Ticket", stat: "st", title: "Full-Blown Tantrum", tier: null, count: 0 },
  30047: { name: "Daiwa Scarlet", stat: "po", title: "Mini Vacation", tier: null, count: 0 },
  30048: { name: "Mejiro Ryan", stat: "g", title: "Winning Pitch", tier: null, count: 0 },
  //30049: { name: null, stat: null, title: null, tier: null },
  //30050: { name: null, stat: null, title: null, tier: null },
  //30051: { name: null, stat: null, title: null, tier: null },
  //30052: { name: null, stat: null, title: null, tier: null },
  //30053: { name: null, stat: null, title: null, tier: null },
  30054: { name: "Nice Nature", stat: "w", title: "Daring to Dream", tier: null, count: 0 },
  30055: { name: "Seiun Sky", stat: "w", title: "Paint the Sky Red", tier: null, count: 0 },
  30056: { name: "King Halo", stat: "po", title: "Tonight We Watz", tier: null, count: 0 },
  30057: { name: "Gold Ship", stat: "sp", title: "That Time I Became the Strongest", tier: null, count: 0 },
  //30058: { name: null, stat: null, title: null, tier: null },
  //30059: { name: null, stat: null, title: null, tier: null },
  //30060: { name: null, stat: null, title: null, tier: null },
  //30061: { name: null, stat: null, title: null, tier: null },
  30062: { name: "Silence Suzuka", stat: "st", title: "Winning Dream", tier: null, count: 0 }
};

const supportNameList = [];
for (const [key, value] of Object.entries(umaSupportIds)) {
    if (value.name !== null) {
        supportNameList.push(value.name);
    }
}

// Initialize cardCount object with all possible card IDs set to 0
const cardCount = {};
for (let i = 10001; i <= 10072; i++) {
  cardCount[i] = 0;
}
for (let i = 20001; i <= 20035; i++) {
  cardCount[i] = 0;
}
for (let i = 30001; i <= 30062; i++) {
  cardCount[i] = 0;
}
//



const getFirstDigit = (num) => {
  // Convert the number to its absolute value to handle negative numbers consistently
  const absoluteNum = Math.abs(num); 
  
  // Convert the absolute number to a string
  const numString = String(absoluteNum); 
  
  // Get the first character of the string, which is the first digit
  const firstDigitChar = numString[0];
  
  // Convert the character back to a number
  const firstDigit = Number(firstDigitChar);
  
  return firstDigit;
}

const getUmaSupportPoolCount = () => {
    let totalR = 0;
    let totalSR = 0;
    let totalSSR = 0;
    for (const [key,value] of Object.entries(umaSupportIds)){
        if ( getFirstDigit(key) === 1 && value.name !== null){
            totalR += 1
        }
        if ( getFirstDigit(key) === 2 && value.name !== null){
            totalSR += 1
        }
        if ( getFirstDigit(key) === 3 && value.name !== null){
            totalSSR += 1
        }
    }
    const totalPoolFor = {
        "R": totalR,
        "SR": totalSR,
        "SSR": totalSSR
    }
    return totalPoolFor;
}

const totalPool = getUmaSupportPoolCount();

console.log("Total R cards in pool = " + totalPool["R"]);
console.log("Total SR cards in pool = " + totalPool["SR"]);
console.log("Total SSR cards in pool = " + totalPool["SSR"]);

// There are 69 R characters each with a rate of 1.106%
const R_RATE = 0.79;
const R_COUNT = totalPool["R"];
// There are 30 SR characters each with a rate of 0.6%
const SR_RATE = 0.18;
const SR_BULK_PULL_RATE = 0.97;
const SR_COUNT = totalPool["SR"];
// There are 39 SSR characters each with a rate of 0.04%
const SSR_RATE = 0.03;
const SSR_BULK_PULL_RATE = 0.03;
const SSR_COUNT = totalPool["SSR"];

let getRandomElementFromObject = (obj) => {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return obj[randomKey];
}


// pull rate = percentage / # of characters

let deck = [];
let deckObj = {
    "test":1,
};
let cardHtml = [];
let deckHtmlObj = {};
let cardCountHtml = [];

let total_money = 0;
let total_money_spent = 0;

let _caratsSaved = 0;
let carats=0;
let caratsTotal=0;

let gotSTier = false;
let pull_count = 0;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let found = false;
let buffer = "";
function scoutForSupport(supportName="Kitasan Black", rarity="SSR") {
    
    if (found) {
        clearInterval(intervalId);
        //clearInterval(setIntervalId2);
        console.log("Cleared intervals");
        return;
    }
    // pay
    
        if (carats < 1500) {
            carats += 5000;
            caratsTotal += 5000;
            total_money_spent += 69.99;
        }

    carats -= 1500;

    // pull
    // rarity = "";
    let pulled;
    let card;

    
    const pullSupport = (rarity="R") => {
        
        if (rarity === "SSR") {
            minId = 30001;
            maxId = 30062;
            console.log("Pulling SSR");
        } else if (rarity === "SR") {
            minId = 20001;
            maxId = 20035;
            console.log("Pulling SR");
        } else {
            minId = 10001;
            maxId = 10072;
            console.log("Pulling R");
        }
        let id;

        id = getRandomNumber(minId,maxId);
        console.log("id pulled " + id);
        card = umaSupportIds[id];

        // check if id is undefined, if so, pull again
        while (card === undefined) {
            console.log("undefined pull, trying again!");
            id = getRandomNumber(minId,maxId);
            card = umaSupportIds[id];
            //window.confirm("pulled undefined card, trying again?");
        }
        // window.confirm(`Pulled ${card.name} [${rarity}]!`);
        console.log('Card name ' + card.name);
        console.log(`${id}`);
        
        
        // track count of each card pulled
        cardCount[id] += 1;


        return id;
    }

    const addToDeck = (id) => {

        if (!(id in deckObj)){
            console.log("NEW CARD!!!")
            deckObj[id] = 1;
            cardHtml.push(`
            <a href="https://umamusu.wiki/${umaSupportIds[id].name.replace(/ /g, "_").replace(/'/g, "").replace(/é/g, "e")}">
                <img src="img/uma-support/${id}.png" alt="${umaSupportIds[id]}"> 
            </a> `);
            deckHtmlObj[id] = {
                imgHtml: `
                    <a href="https://umamusu.wiki/${umaSupportIds[id].name.replace(/ /g, "_").replace(/'/g, "").replace(/é/g, "e")}">
                        <img src="img/uma-support/${id}.png" alt="${umaSupportIds[id]}">
                    </a>
                `,
                count: 1
            };
        } else {
            if (deckHtmlObj[id] !== undefined){
                deckHtmlObj[id].count += 1;
            }
            deckObj[id] += 1;
            umaSupportIds[id].count += 1;
            console.log(`${id}: ${deckObj[id]}`);
        }
        deck.push(id);
        //window.alert(`Added ${umaSupportIds[id].name} to deck!`);
        console.log(`deckHtmlObj: ${deckHtmlObj}`);
    }

    let randomInteger;
    for (let i = 0; i < 10; i++) {
        console.log(`Pull #${i + 1}`);
        let rarity = "";
        
        randomInteger = getRandomNumber(1, 100);
        // For the first 9 pulls, normal rates apply
        if (i < 9) {
        // SSR rate is 3%
if (i < 9) {
    if (randomInteger <= 3) {
        rarity = "SSR";
    } else if (randomInteger <= 21) {
        rarity = "SR";
    } else {
        rarity = "R";
    }
}
        } else if (i === 9) {
            // On the 10th pull, guaranteed SR or better
            // SSR rate is 3%
    if (randomInteger <= 3) {
        rarity = "SSR";
    } else {
        rarity = "SR";
    }
        }
        id = pullSupport(rarity);
        addToDeck(id);
    }


    for (const [key, value] of Object.entries(cardCount)) {
        if (value > 0) {
            cardCountHtml.push(`${umaSupportIds[key].name} x${value}`);
        }
    }
    let deckOutput = document.createElement("div");
    deckOutput.class = "row";
    let deckList = [];
    let ogName = "";
    let wikiName = "";

    for (const [key, value] of Object.entries(deckHtmlObj)) {
        if (value.count >= 1) {
            
            ogName = umaSupportIds[key].name;
            wikiName = ogName.replace(/ /g, "_").replace(/'/g, "").replace(/é/g, "e");
            deckHtmlObj[key].imgHtml = `

            <div class="parent">
                <img class="image1" src="img/uma-support/${key}.png" alt="${umaSupportIds[key]}" />
                <img class="image2" src="img/utx_txt_rarity_0${getFirstDigit(key)}.png" alt="rarity" />
                <img class="image3" src="img/utx_ico_obtain_${umaSupportIds[key].stat}.png" alt="stat" />
                <div class="parentcontent"><h3>${value.count}x <a target="_blank"href="https://umamusu.wiki/${wikiName}">${umaSupportIds[key].name}</a> [${umaSupportIds[key].title}]</h3></div>
            </div>

            `;
            //console.log(`deckHtmlObj[key].imgHtml: ${deckHtmlObj[key].imgHtml}`);
            deckList.push(deckHtmlObj[key].imgHtml);
        }
    }
    
    const columns = 10;
    buffer = "";
    for (let i = 1; i < deckList.length+1; i++) {
        if ((i-1) % columns === 0) {
            if (i !== 1) {
                buffer += "</div>";
            }
            buffer += "<div class='row'>"
        }
        buffer += "<div class='col'>"
        buffer += deckList[i-1];
        buffer += "</div>";
    }
    
    deckOutput.innerHTML = buffer;

    // check if pulled support is the one we're scouting for
    for (let id in deck) {
        if (umaSupportIds[deck[id]].name === supportName && id > "30000") {
            window.alert(`Got ${supportName}! Total money spent: $${total_money_spent.toFixed(2)}`);
            console.log(`Got ${supportName}! Total money spent: $${total_money_spent.toFixed(2)}`);
            found = true;
            divPulled.innerHTML = `
                <h2>Got ${supportName}!</h2>
                <div class="container">
                    <img src="img/uma-support/${id}.png" alt="${deck[id].name}">
                </div>
                <h3><img src="img/uma-carat-64x64.png" alt="Carats">:${caratsTotal}</h3>
                <h3>Total Spent: $${total_money_spent.toFixed(2)}</h3>
                <h3>Total pulls: ${deck.length}</h3>
                <h3>Deviance from expected pulls (2500): ${Math.sqrt((deck.length - 2500)**2)}</h3>
                <h3>Deck:</h3>
                 ${buffer}
                `;
            document.getElementById("keyvisual").src = "img/uma-key-visual-expensive.png";         
            return;
        }
    }       

    divOutput.innerHTML = "";
   divOutput.appendChild(deckOutput);
   printDeck();
   
}


function printDeck() {
    console.log(`carats left: ${carats}`);
    console.log(`Total money spent so far: $${total_money_spent.toFixed(2)}`);
    console.log(`Current deck: ${deck.join(", ")}`);
    console.log(`Total pulls so far: ${deck.length}`);

    console.log(`deckObj: ${deckObj}`)
    for (const key in deckObj) {
        console.log(`id:${key},  ${deckObj[key]}`);
    }
}

const test = () => {
    console.log("Test function called");
}
var intervalId;
var setIntervalId;




/* APP */
const app = document.getElementById("app");

// Carat input field
// Carat input
const caratInputLabel = document.createElement("label");
caratInputLabel.htmlFor = "caratInput";
caratInputLabel.innerHTML = "Enter <img src='img/uma-carat-32x32.png' alt='Carats'>:";
app.appendChild(caratInputLabel);

// Saved Carats Input field
const caratsInput = document.createElement("input");
caratsInput.type = "number";
caratsInput.value = 15000;
caratsInput.id = "caratInput";
app.appendChild(caratsInput);
app.appendChild(document.createElement("br"));
//

// Scout Input Field
// Scout for input
const scoutForInputLabel = document.createElement("label");
scoutForInputLabel.htmlFor = "scoutForInput";
scoutForInputLabel.textContent = "Scout for:";
app.appendChild(scoutForInputLabel);

// Dropdown menu for support
const supportDropdown = document.createElement("select");
supportNameList.forEach(supportName => {
    const option = document.createElement("option");
    option.value = supportName;
    option.textContent = supportName;
    if (supportName === "Kitasan Black") {
        option.selected = true;
    }
    supportDropdown.appendChild(option);
});
supportDropdown.id = "supportDropdown";

app.appendChild(supportDropdown);

/*
// Input field
const scoutForInput = document.createElement("input");
scoutForInput.type = "text";
scoutForInput.id = "scoutForInput";
scoutForInput.value = "kitasan black";
*/

// Add dropdown menu for rarity
const rarityDropdown = document.createElement("select");
rarityDropdown.id = "rarityDropdown";
const rarities = ["SSR", "SR", "R"];
rarities.forEach(rarity => {
    const option = document.createElement("option");
    option.value = rarity;
    option.textContent = rarity;
    rarityDropdown.appendChild(option);
});
app.appendChild(rarityDropdown);


const capitalizeFirstLetterOfEachWord = (str) => {
    str.trim().toLowerCase();
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
const sanitizeValue = (str) => {
    return capitalizeFirstLetterOfEachWord(str.trim().toLowerCase());
}
// app.appendChild(scoutForInput);
// Scout button
const scoutForInputButton = document.createElement("button");
scoutForInputButton.textContent = "Scout 10";
scoutForInputButton.addEventListener("click", () => {
  // Add functionality here
  const sanitizedInput = capitalizeFirstLetterOfEachWord(supportDropdown.value.trim().toLowerCase());
  scoutForSupport(sanitizedInput);
});
app.appendChild(scoutForInputButton);
//

/*
// Auto Scout with saved carats button
const autoScoutButton = document.createElement("button");
autoScoutButton.textContent = "Auto Scout with Saved Carats";
autoScoutButton.addEventListener("click", () => {
  // Add functionality here
  const sanitizedInput = sanitizeValue(supportDropdown.value);
});
app.appendChild(autoScoutButton);
*/
//

function runPulls() {
    const resetFound = () => {
        found = false;
    }
    const resetDeck = () => {
        deck = [];
        deckObj = {};
        cardHtml = [];
        deckHtmlObj = {};
        cardCountHtml = [];
        total_money = 0;
        total_money_spent = 0;
        carats=0;
        caratsTotal=0;
        pull_count = 0;
    }
    resetFound();
    resetDeck();
    clearInterval(intervalId);
    // intervalId = setInterval(scoutForSupport, 250, sanitizeValue(scoutForInput.value));
    console.log("Looking for " + sanitizeValue(supportDropdown.value));
    intervalId = setInterval(scoutForSupport, 250, sanitizeValue(supportDropdown.value));
}