// Script for getting random waifus from https://waifu.im
// var globals
// let scoped

// Death clock
let trials = 1;
let maxBullets = 5;
let bulletsLeft = 5;
let cartridge = ["","","","",""];
let gameOver = false;
var probability = function(n) {
    return !!n && Math.random() <= n;
};

async function setupDeathGame() {
    const deathGame = document.getElementById('death-game');
    deathGame.innerHTML = '<h2>Russian Roulette</h2><p>Enter a probability [0-1](Russian Roulete ~1/6 or .17):</p>';
    const bulletsDiv = document.createElement('div');
    const probInput = document.createElement('input');
    probInput.id = 'prob-input';
    probInput.type = 'number';
    const executeProbBtn = document.createElement('button');
    executeProbBtn.textContent = 'SHOOT';
    
    executeProbBtn.addEventListener("click", async function getSuccess() {
        
        let value = probInput.value;
        console.log('prob_value =' + value);
        if(value == null || value == "") {
            value = 0.17;
        }
        probInput.value = 0.17;
        let success = probability(value);
        bulletsLeft--;
        console.log('bullets left = ' + bulletsLeft);
        let outcome = document.createElement('div');
        
        //cartridge +='<p>';
        for(i=0;i<maxBullets;i++){
            cartridge[i] = "";
        }
        for(i=0;i<bulletsLeft;i++){
            cartridge[i] = "[]";
        }
        // cartridge +='</p>';
        // bulletsDiv.innerHTML = cartridge;
        // deathGame.appendChild(bulletsDiv);
        
        if (success) {
            outcome.innerHTML = `<p style=\'color:red\'>*BANG*[${trials}]${cartridge}You died. X_X</d>`;
            bulletsLeft = 5;    
        } else if (!success && bulletsLeft === 0){
            outcome.innerHTML = `<p style=\'color:blue\'>*BANG*[${trials}]${cartridge}You WIN! :)</d>`;
            bulletsLeft = 5;
        }
        else {
            outcome.innerHTML = `<p>*BANG*[${trials}]${cartridge}You live... :|</d>`;
        }
        trials++;
        deathGame.appendChild(outcome);
    });
    deathGame.appendChild(probInput);
    deathGame.appendChild(executeProbBtn);
}

// see: https://xkcd.com/json.html
async function setupXkcd() {
    const xkcd_base_url='https://xkcd.com/';
    const xkcd_latest_url='https://xkcd.com/info.0.json';
    const xkcd_base_comics_url='https://imgs.xkcd.com/comics';
    const xkcdDiv = document.getElementById('xkcd');
    const xkcdImg = document.createElement('img');
    const xkcdImgInfo = document.createElement('div');
    const xkcdSearch = document.createElement('a');
    xkcdSearch.href="https://xkcd-search.typesense.org/";
    xkcdSearch.textContent="xkcd search";
    let xkcdNum = 1;
    let xkcdLatestNum = 3049;
    // This is how we hack our way around the CORS problem
    // see: https://www.explainxkcd.com/wiki/index.php/List_of_all_comics_(full)
    const comics = [
        "incoming_asteroid",
        "suspension_bridge",
        "rotary_tool",
        "stromatolites",
        "alphamove",
        "batman",
        "git",
        "sheep",
        "scientists",
        "hitler"
    ]
    try {
        const xkcdResponse = await fetch(xkcd_latest_url);
        const xkcdResponseJson = await xkcdResponse.json();
        xkcdImgInfo.innerHTML = `<h2>${xkcdResponseJson.safe_title}</h2> <p>Date:${xkcdResponseJson.month}/${xkcdResponseJson.day}/${xkcdResponseJson.year}</p>`;
        xkcdNum = xkcdResponseJson.num;
        xkcdImg.src = xkcdResponseJson.img;
        xkcdDiv.appendChild(xkcdImgInfo);
        xkcdDiv.appendChild(xkcdImg);
    } catch (error){
        console.log("ERROR: Unable to fetch xkcd: " + error);
        const selectedComic = getRandomElement(comics);
        let final_comic_url = xkcd_base_comics_url + '/' + selectedComic + '.png';
        xkcdImg.src = final_comic_url;
        xkcdImgInfo.innerHTML = `<h2>xkcd: ${selectedComic}</h2>`;
        xkcdDiv.appendChild(xkcdImgInfo);
        xkcdDiv.appendChild(xkcdImg);
    }
    xkcdDiv.appendChild(xkcdSearch);
}

async function setupNekosApi()  {
    const nekos_base_url='https://nekos.best/api/v2';
    const nekos = document.getElementById('anime-nekos-api');
    
    // Dynamically Get nekos endpoints and generate a dropdown( select) menu
    const labelForDropdown = document.createElement('label');
    labelForDropdown.textContent = 'I want anime...';
    labelForDropdown.setAttribute('for', 'neko-dropdown');
    
    const dropdownMenu = document.createElement('select');
    dropdownMenu.setAttribute('id', 'neko-dropdown');
    nekos.appendChild(labelForDropdown);
    const nekoEndpoints = [];
    let newOption;
    let selectedEndpoint = "neko";
    try{
        const endpointsResponse = await fetch(nekos_base_url + `/endpoints`);
        console.log('Fetched from ' + nekos_base_url + `/endpoints`);
        const endpointsJson = await endpointsResponse.json();
        console.log(endpointsJson);
        // Length is underined because the json is not an array 
        // Misconception: I thought the number of fields would give you the 'length'
        console.log('endpointsJson.length = '+ endpointsJson.length);
        Object.keys(endpointsJson).forEach( field => {
            console.log(`${field}`);
            nekoEndpoints.push(field);
            newOption = document.createElement('option');
            newOption.value = field;
            newOption.text = field;
            dropdownMenu.add(newOption);
        });
        console.log(nekoEndpoints);
        for(i=0;i<endpointsJson.length;i++){
            console.log('endpointsJson[i] = ' + endpointsJson[i]);
        }
    }catch(error){
        console.log('ERROR: Unable to fetch: ' + error);
    }
    dropdownMenu.addEventListener("change", function getNekoEndpoint(){
        selectedEndpoint = dropdownMenu.value;
    });
    nekos.appendChild(dropdownMenu);
    


    // nekos button
    const button = document.createElement('button');
    const img = document.createElement('img');
    button.textContent = 'Now.';
    button.addEventListener("click", async function pingNekosApi() {
        const amount = 5;
        try {
            const response = await fetch(nekos_base_url + `/${selectedEndpoint}` + `?amount=${amount}`);
            const json = await response.json();
            
            json.results.forEach((element) => {
                console.log('element = ' + element);
                console.log('element.artist_href' + element.artist_href);
            });
    
            for(let i=0; i<json.results.length; i++){
                console.log(json.results[i]);
            }
            console.log(json.results[0]);
            img.src = json.results[0].url;
            nekos.appendChild(img);
        } catch (error){
            console.log('ERROR: Unable to fetch from ')
        }


    });
    nekos.appendChild(button);
    // END nekos button


}

// Unique number
class UniqueRNG {
    constructor(min, max) {
      this.numbers = [];
      for (let i = min; i <= max; i++) {
        this.numbers.push(i);
      }
      this.shuffle(this.numbers);
    }
  
    reset(min, max) {
      this.numbers = [];
      for (let i = min; i <= max; i++) {
        this.numbers.push(i);
      }
      this.shuffle(this.numbers);
      console.log("rng bucket refilled");
    }

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    draw() {
      if (this.numbers.length === 0) {
        // reset
        this.reset();
        // throw new Error("No more unique numbers available.");
      }
      return this.numbers.pop();
    }
}
// END Unique Number

function shuffleArray(array){
    // copied array
    cArray = array.slice(0);
    for (let i = cArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cArray[i], cArray[j]] = [cArray[j], cArray[i]];
    }
    return cArray;
}

// START waifu

const waifuisms = [
    "You're my hero.", 
    "I'm always here for you.",
    "Don't worry, I'll protect you.",
    "You look so handsome today.",
    "I love cooking for you.",
    "I'm so proud of you.",
    "You're the only one for me.",
    "Please take care of yourself.",
    "Don't ever leave me."
];

const preferences = [
    "maid",
    "waifu",
    "marin-kitagawa",
    "mori-calliope",
    "raiden-shogun",
    "oppai",
    "selfies",
    "uniform",
    "kamisato-ayaka"
]

function getRandomElement(array){
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
}

var scaleFactor = 0.25;
var included_tags = [];
included_tags.push(getRandomElement(preferences));

var dropdown;
var var1;
var url1;



function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

function getIncludedTags(){
    console.log('included_tags = ' + included_tags);
}

function clearElementById(id) {
    console.log('Clearing from element: ' + id);
    document.getElementById(id).innerHTML = "";
}

async function getRandomWaifu() {
    const url = "https://zenquotes.io/api/quotes";
    // see: https://docs.waifu.im/quick-start
    // Here is an example to get a random image with  maid tags:
    // Set up a url builder for this
    const url_waifuim = "https://api.waifu.im/search";
    
    dropdown = document.getElementById("dropdownMenuForTag");
    if (dropdown.value === "random"){
        let selectedPreference = getRandomElement(preferences);
        console.log("selected (rng) preference = " + selectedPreference);
        if (included_tags.length === 0){
            included_tags.push(selectedPreference);
            return;
        }
        let index = included_tags.indexOf(selectedPreference);
        if (index === -1 ) included_tags.splice(0,1,selectedPreference);
    }
    
    
    let url_included_tags = "?included_tags=" + included_tags[0];
    let final_url = url_waifuim + url_included_tags;
    var newParagraph;
    var textNode;
    var img;
    try {
        console.log("Trying to fetch from: " + final_url);
        const response = await fetch(final_url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("json = " + json);
        console.log("json.images = " + json.images);
        
        // Reset div (clear so we can replace with another image to not clog the screen)
        document.getElementById('pic').innerHTML = "";

        if (Array.isArray(json.images)){
            console.log("json.images.length = " + json.images.length);
            for (var i=0; i < json.images.length; i++){
                var jsonElement = json.images[i];
                console.log(jsonElement);
                
                // img
                img = document.createElement('img');
                
                img.src = jsonElement.url;
                
                // Scale image
                img.width = jsonElement.width * scaleFactor;
                console.log("img.width = " + img.width);
                img.height = jsonElement.height * scaleFactor;
                console.log("img.src = " + img.src);
                //


                document.getElementById('pic').appendChild(img);
                // End img

                // Credits
                const art_credits_element = document.createElement('p');
                
                
                let artist_name = '';
                let art_credits_patreon = '';
                let art_credits_pixiv = '';
                let art_credits_twitter = '';
                let art_credits_deviantArt = '';
                
                const creditElements = document.getElementById('credits');

                if (jsonElement.artist != null){
                    if ( jsonElement.artist.name != null){
                        artist_name = jsonElement.artist.name;
                        const creditNameElement = document.getElementById('creditsName');
                        creditNameElement.innerHTML = 'Name: ' + artist_name + '<br>';
                    } 
                    if (jsonElement.artist.patreon != null){
                        art_credits_patreon += jsonElement.artist.patreon;
                        const creditArtistElement = document.getElementById('creditsPatreon');
                        creditArtistElement.innerHTML = 'Patreon: ' + '<a href=\"' + art_credits_patreon + `\">${art_credits_patreon}</a>` + '<br>'
                        
                    }
                    if (jsonElement.artist.pixiv != null){
                        art_credits_pixiv += jsonElement.artist.pixiv;
                        const creditPixivElement = document.getElementById('creditsPixiv');
                        creditPixivElement.innerHTML = 'Pixiv: ' + '<a href=\"' + art_credits_pixiv + `\">${art_credits_pixiv}</a>` + '<br>'
                    }
                    if (jsonElement.artist.twitter != null){
                        art_credits_twitter += jsonElement.artist.twitter;
                        const creditTwitterElement = document.getElementById('creditsTwitter');
                        creditTwitterElement.innerHTML = 'Twitter: ' + '<a href=\"' + art_credits_twitter + `\">${art_credits_twitter}</a>`+ '<br>'
                    }
                    if (jsonElement.artist.deviant_art != null){
                        art_credits_deviantArt += jsonElement.artist.deviant_art;
                        const creditDeviantartElement = document.getElementById('creditsDeviantart');
                        creditDeviantartElement.innerHTML = 'Deviant Art: ' + '<a href=\"' + art_credits_deviantArt + `\">${art_credits_deviantArt}</a>` +'<br>'
                    }

                    console.log('jsonElement.artist.patreon) = ' + jsonElement.artist.patreon);
                    console.log('jsonElement.artist.pixiv) = ' + jsonElement.artist.pixiv);
                    console.log('jsonElement.artist.twitter) = ' + jsonElement.artist.twitter);
                    console.log('jsonElement.artist.deviantArt) = ' + jsonElement.artist.deviant_art);
    
    
                    console.log('patreon = ' + art_credits_patreon);
                    console.log('pixiv = '+ art_credits_pixiv);
                    console.log('twitter = '+ art_credits_twitter);
                    console.log('deviant = '+ art_credits_deviantArt);
                    // End credits
                }
            }
        }

        // const json_obj = JSON.parse(json);

        // Add waifuism
        const waifuismElement = document.getElementById("waifuism");
        waifuismElement.innerHTML = "";
        console.log('getRandomElement = ' + getRandomElement(waifuisms));
        console.log('waifuisms = ' + waifuisms[getRandomElement(waifuisms)]);
        waifuismElement.innerHTML = '<br><h3>\"' + getRandomElement(waifuisms) + '\"</h3>';

        newParagraph = document.createElement("p")
        textNode = document.createTextNode("placeholder");

        // Add the waifuism

    } catch(error) {
        console.error(error.message);
    } 
}

// END waifu

// START pterry
const pterryQuotes = [
    "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it. - Terry Pratchett,Diggers",
    "Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life. ― Terry Pratchett, Jingo",
    "“Some humans would do anything to see if it was possible to do it. If you put a large switch in some cave somewhere, with a sign on it saying 'End-of-the-World Switch. PLEASE DO NOT TOUCH', the paint wouldn't even have time to dry.” ― Terry Pratchett, Thief of Time",
    "\"And what would humans be without love?\" RARE, said Death. ― Terry Pratchett, Sourcery"
]

function getPterryQuote(){
    let pterryQuoteElement = document.getElementById('pterryQuote');
    let p = document.createElement('p');
    p.textContent = getRandomElement(pterryQuotes);
    pterryQuoteElement.appendChild(p);
}
// END Pterry

const homeQuotes = [
    "is where the heart is.",
    "sweet home.",
    "is a place.",
    "is a feeling",
    "welcome.",
]

// START main
window.onload = main();

function main() {
    // Home quote
    const homeQuote = document.getElementById("home-quote");
    homeQuote.innerHTML = '<h1>HOME</h1>' + `<p>${getRandomElement(homeQuotes)}</p`;

    // add dark mode functionality
    darkModeButton = document.getElementById("dark-mode-toggle");
    darkModeButton.addEventListener("click", () => {
        {
            document.body.classList.toggle('dark-mode');
        }
    });

    // change background color
    document.getElementById("mybody").classList.add("bg-color");

    //death-game
    setupDeathGame();

    //xkcd
    setupXkcd();
    // nekos api
    setupNekosApi();

    // Get preference for waifu
    dropdown = document.getElementById("dropdownMenuForTag");
    console.log('dropdown object = ' + dropdown );

    // add functionality for random preference
    dropdown.addEventListener("change", function(){
        console.log('dropdown.value = ' + dropdown.value);

        if (dropdown.value === "random"){
            let selectedPreference = getRandomElement(preferences);
            console.log("selected (rng) preference = " + selectedPreference);
            if (included_tags.length === 0){
                included_tags.push(selectedPreference);
                return;
            }
            let index = included_tags.indexOf(selectedPreference);
            if (index === -1 ) included_tags.splice(0,1,selectedPreference);
            return;
        } else {
            let index = included_tags.indexOf(dropdown.value);
            console.log("index = " + index);
            // add only if it does not exist yet
            if (index === -1 ) included_tags.splice(0, 1, dropdown.value);
        }

    });
    //
    var1 = document.getElementById("pic");
    console.log('pic = ' + var1 );

    getPterryQuote();
}
// END main