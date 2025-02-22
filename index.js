// Script for getting random waifus from https://waifu.im
// EDIT:  This script has become the homepage. oops

// absence of var, let, const means global e.g x=1 , x is global
// var globals
// let scoped

// hey its jquery lite!
const $ = document;

// see: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = ms => new Promise(res => setTimeout(res, ms));

function delay2(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function getRandomElement(array){
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
}

function clearElementById(id) {
    console.log('Clearing from element: ' + id);
    document.getElementById(id).innerHTML = "";
}

function shuffleArray(array){
    // copied array
    cArray = array.slice(0);
    for (let i = cArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cArray[i], cArray[j]] = [cArray[j], cArray[i]];
    }
    return cArray;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function showImageThenDelete(img_src="https://nekos.best/api/v2/shoot/4729a845-d48c-4420-a46f-3afa0b5d6a49.gif", ms=2000) {
    const img = document.createElement('img');
    console.log('img_src = '+img_src);
    img.src = img_src; // Replace with your image URL
    img.alt = 'Sample Image';
    img.id = 'tempImage';
    document.getElementById('image-container').appendChild(img);
    // Compensate if user mistakes seconds instead
    if (ms >= 1 && ms <= 10){
        
        ms *= 1000;
    }
    // Delete the image after 3 seconds (3000 milliseconds)
    setTimeout(() => {
        const image = document.getElementById('tempImage');
        if (image) {
            image.remove();
        }
    }, ms);
}

// Death clock
let currentChamber = 0;
let trials = 1;
let maxBullets = 5;
let triesLeft = 5;
let cartridge = [true,false,false,false,false,false];
let gameOver = false;
var probability = function(n) {
    return !!n && Math.random() <= n;
};

async function setupDeathGame() {
    const deathGame = document.getElementById('death-game');
    deathGame.innerHTML = '<h2>Russian Roulette</h2><p>Instructions: Press NEW GAME. Then SHOOT.<br> The chamber will be spun and the fates will decide if you live or die. (Russian Roulette has ~1/6 or .17 of dying):</p>';
    const bulletsDiv = document.createElement('div');
    
    const tempImageContainer = document.createElement('div');
    tempImageContainer.id = 'image-container';

    const triesLabel = document.createElement('div');
    triesLabel.innerHTML = "<p>Roundss to survive (put 100 if you're a mashochist):</p>"
    const triesInput = document.createElement('input');
    triesInput.id = 'tries-input';
    triesInput.type = 'number';
    triesInput.value = 3;

    const probInput = document.createElement('input');

    probInput.id = 'prob-input';
    probInput.type = 'number';

    let attempts = 3;

    let gameStarted = false;
    const startGameBtn = document.createElement('button');
    startGameBtn.textContent = 'NEW GAME';
    startGameBtn.addEventListener("click", function startGame(){
        gameStarted = true;
        triesLeft = triesInput.value;
        outcomeDiv.innerHTML = "";
    })

        // tries left
    const triesLeftCounter =  document.createElement('div');
    
    const shootBtn = document.createElement('button');
    shootBtn.textContent = 'SHOOT';
    
    const outcomeDiv = document.createElement('div');
    shootBtn.addEventListener("click", async function getSuccess() {
        
        shuffle(cartridge);

        let value = probInput.value;
        console.log('prob_value =' + value);
        if(value == null || value == "") {
            value = 0.17;
        }
        probInput.value = 0.17;
        let success = probability(value);
        // let success = cartridge[currentChamber];

        triesLeft--;
        console.log('tries left = ' + triesLeft);
        let outcome = document.createElement('div');
        
        if (gameStarted) {
            // showImageThenDelete('https://media.tenor.com/fklGVnlUSFQAAAAM/russian-roulette.gif');
            
            // you died (the bullet was inside this chamber)
            if (success) { 
                outcome.innerHTML = `<p style=\'color:red\'>*BANG*[${trials}]You died. X_X GAME OVER</p>`;
                bulletsLeft = 5;
                currentChamber = 0;
                trials = 0;
                gameStarted = false;
                await delay(500);
                await showImageThenDelete();
                
            }
            // you win 
            else if (!success && triesLeft === 0){
                outcome.innerHTML = `<p style=\'color:blue\'>*CLICK*[${trials}]You WIN! :)</p>`;
                bulletsLeft = 5;
                currentChamber = 0;
                trials = 0;
                gameStarted = false;
                await delay(500);
                let url = await getNekosImgLink();
                console.log('url = ' + url);
                // await showImageThenDelete('https://nekos.best/api/v2/highfive/04825fb0-9e88-47a6-a4a6-0ca476c75101.gif',3);
                await showImageThenDelete(url,3);
                
            }
            // you survived
            else {
                await delay(200);
                outcome.innerHTML = `<p>*CLICK*[${trials}]You live... :|</p>`;
            }
            trials++;
            
        } else {
            outcome.innerHTML = 'Press NEW GAME';
        }
        outcomeDiv.appendChild(outcome);
        triesLeftCounter.innerHTML = `Rounds to survive: ${triesLeft}`;
    });
    deathGame.appendChild(triesLabel);
    deathGame.appendChild(triesInput);
    
    deathGame.appendChild(triesLeftCounter);
    
    deathGame.appendChild(startGameBtn);
    // deathGame.appendChild(probInput);
    deathGame.appendChild(shootBtn);
    deathGame.appendChild(tempImageContainer);
    deathGame.appendChild(outcomeDiv);
    
}

//
const nekos_base_url = 'https://nekos.best/api/v2';
/** Pings nekos api at _selectedEndpoint to get a link
 * @param _selectedEndpoint // a tag
 * @returns url
 */
async function getNekosImgLink(_selectedEndpoint='highfive') {
    const amount = 1;
    const selectedEndpoint = _selectedEndpoint;
    let nekos_final_url = nekos_base_url + `/${selectedEndpoint}` + `?amount=${amount}`;
    try {
        
        const response = await fetch(nekos_final_url);
        const json = await response.json();
        
        json.results.forEach((element) => {
            console.log('element = ' + element);
            console.log('element.artist_href' + element.artist_href);
        });

        for(let i=0; i<json.results.length; i++){
            // console.log(json.results[i]);
        }
        const img = document.createElement('img');
        console.log(json.results[0]);
        img.src = json.results[0].url;
        console.log('img src= ' + img.src);
        // nekos.appendChild(img);
        return img.src;
    } catch (error){
        console.log('ERROR:  ' + error );
    }
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
        // Length is undefined because the json is not an array 
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



var scaleFactor = 0.25;
var included_tags = [];
included_tags.push(getRandomElement(preferences));

var dropdown;
var var1;
var url1;

function getIncludedTags(){
    console.log('included_tags = ' + included_tags);
}

/**
 * 
 * Sets up frontend to interface with waifu im API
 * 
 * replaces setupWaifuImOld() b/c the function is more concise \
 * due to use of function expressions and closures
 * @returns 
 */
async function setupWaifuIm(){
    const waifuImDiv = $.getElementById('waifu-im');
    
    // get tags
    const getTags = async () => {
        const tagsUrl='https://api.waifu.im/tags';
        const response = await fetch(tagsUrl);
        const json = await response.json();
        return json;
    }

    let newOption;
    const createDropDownMenuFromTags = ( async () => {
        const waifuImDiv = $.getElementById('waifu-im');
        // ddmenu = drop down menu
        const ddMenu = $.createElement('select');
        ddMenu.id = 'waifu-im-drop-down-menu';
        // get tags from api
        const tagsJson = await getTags();
        const tagsList = tagsJson.versatile;

        tagsList.forEach( (tag) => {
            newOption = $.createElement('option');
            newOption.value = tag;
            newOption.text = tag
            ddMenu.add(newOption);
        });

        waifuImDiv.appendChild(ddMenu);

    })(); // <-- Immediately Invoked Function expression runs right away so you don't have to call it later, cool

    const createDDButton = ( () => {
        // create button
        const ddBtn = $.createElement('button');
        ddBtn.textContent = 'Give me waifu';
        ddBtn.addEventListener( 'click', async ()=> {
            const waifuImUrl = 'https://api.waifu.im/search';
            const selectedValue = $.querySelector('#waifu-im-drop-down-menu').value;
            console.log('[waifu-im] selected tag = ' + selectedValue);
            // use default value if we can't find any
            if (selectedValue == null || selectedValue === ""){
                selectedValue = "versatile";
            }
            const waifuImFinalUrl = waifuImUrl + `?included_tags=${selectedValue}`;
            // fetch from url
            console.log(`[waifu-im] attempting to fetch from ${waifuImFinalUrl}`);
            const resp = await fetch(waifuImFinalUrl);
            const respJson = await resp.json();
            const jsonStrPretty = JSON.stringify(respJson,null,2);
            console.log(`[waifu-im] JSON ${jsonStrPretty}`);
            const json = respJson;
            if (Array.isArray(respJson.images)) {
                // e === element
                respJson.images.forEach( async (e) => {
                    
                    // extract the image url
                    const imgUrl = e.url;
                    console.log(`[waifu-im] imgUrl = ${imgUrl}`);
                    // create the img element
                    const img = $.createElement('img');
                    img.src = imgUrl;
                    img.alt = 'supposed to be a waifu here';
                    // add it to the page
                    waifuImDiv.appendChild(img);

                    const createArtistCredits = (() => {
                        const artistCreditsDiv = $.createElement('div');
                        if (e.artist == null){
                            console.warn('[waifu-im] Artist data missing from response');
                        } else {
                            let artist_id = '';
                            let deviant_art = '';
                            let name = '';
                            let patreon = '';
                            let pixiv = '';
                            let twitter = '';
                            const a = e.artist;
                            if (e.artist.artist_id != null){
                                artist_id = a.artist_id;
                            }
                            if (e.artist.deviant_art != null){
                                deviant_art = a.deviant_art;
                            }
                            if (e.artist.name != null){
                                name = a.name;
                            }
                            if (e.artist.patreon != null){
                                patreon = a.patreon;
                            }
                            if (e.artist.pixiv != null){
                                pixiv = a.pixiv;
                            }
                            if (e.artist.twitter != null){
                                twitter = a.twitter;
                            }
                            artistCreditsDiv.innerHTML = `<p>Name: ${name} <br>
                            Deviant Art: ${deviant_art} <br> 
                            Patreon: ${patreon} <br> 
                            Pixiv: ${pixiv}<br>
                            Twitter: ${twitter}<br>
                            </p>` 
                            waifuImDiv.appendChild(artistCreditsDiv);
                        }
                    })();
                });



            } else {
                console.error(`[waifu-im] respJson not array`);
            }

        });
        waifuImDiv.appendChild(ddBtn);
    })();


}

/**
 * Deprecated: replaced with setupWaifuIm
 * Sets up frontend to interface with waifu im API
 * @returns 
 */
async function getWaifuImOld() {
    const url = "https://zenquotes.io/api/quotes";
    // see: https://docs.waifu.im/quick-start
    // Here is an example to get a random image with  maid tags:
    // Set up a url builder for this
    const url_waifuim = "https://api.waifu.im/search";
    

    const url_getSfw = 'https://api.waifu.im/search?include_tags=versatile';

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

// START interesting-links
function setupInterestingLinks() {
    const appendBr = (_parent) => {
        const br = $.createElement('br');
        _parent.appendChild(br);
    }
    const createLink = (href, textContent) => {
        const link = $.createElement('a');
        link.href = href;
        link.textContent = textContent;
        return link;
    }
    const createLinkAndAppendTo = (_parent, href, textContent) => {
        const link = $.createElement('a');
        link.href = href;
        link.textContent = textContent;
        _parent.appendChild(link);
    }
    
    const interestingLinksDiv = document.getElementById('interesting-links');
    const iDiv = interestingLinksDiv;

    const title = document.createElement('h2');
    title.textContent = 'Interesting Links';
    

    // Turn this list into a dictionary url, label
    const darkPatternsLink = document.createElement('a');
    darkPatternsLink.href = 'https://www.deceptive.design/';
    darkPatternsLink.textContent = 'Dark Patterns / Deceptive Design';

    interestingLinksDiv.appendChild(title);
    interestingLinksDiv.appendChild(darkPatternsLink);
    appendBr(iDiv);

    const tvTropesLink = createLink('https://tvtropes.org', 'tv tropes');
    iDiv.appendChild(tvTropesLink);
    appendBr(iDiv);
    const testLink = createLink('https://example.com', 'reserve site by iana used for documentation');
    iDiv.appendChild(testLink);
    appendBr(iDiv);
    createLinkAndAppendTo(iDiv, 'https://example.com', 'example')
}
// END interesting-links

const setupScene = () => {
    class Scene {
        constructor(id, desc, adjacentScenes){
            this.id = id;
            this.desc = desc;
            this.adjacentScenes = adjacentScenes;
        }
        getId(){
            return this.id;
        }
        getDesc(){
            return this.desc;
        }
        getAdjacentScenes(){
            return this.adjacentScenes;
        }
        describe(){
            return `<h3>${this.id}</h3> ${this.desc}`;
        }
    }

    const ironswornLocations = [
        'barrier islands',
        'ragged coast',
        'deep wilds',
        'flooded lands',
        'havens',
        'hinterlands',
        'tempest hills',
        'veiled mountains',
        'shattered wastes'
    ];
    
    // [0]=current [1..n] = adjacent
    const ironSwornMap = [
            [0,1],
            [1,0,2,5,6],
            [2,1,4,5],
            [3,0,4],
            [4,1,3,5],
            [5,2,4,6],
            [6,5,7],
            [7,6,8],
            [8,7],
    ];
    ironSwornMap.forEach((location)=>{
        const currentLocation = location[0];
        let adjacentLocations = [];
        for(let i=0; i< location.length-1; i++){
            adjacentLocations.push(location[i]);
        }
        console.log(`${adjacentLocations}`);
    })
}

const setupNineRealms =(() => {
    
    class Realm {
        constructor(name, desc){
            this.name = name;
            this.desc = desc;
        }
        describe() {
            return `<h3>${this.name}</h3> ${this.desc}`;
        }
    }

    class Monster {
        constructor(name, desc){
            this.name = name;
            this.desc = desc;
        }
        describe() {
            return `${this.name} ${this.desc}`
        }
    }

    const cosmos = new Realm('cosmos', 'the realm between realms, the tree of life Ygdrassil is located here, you must go through here everytime you travel between the realms')
    const midgard = new Realm('midgard', 'The world of humans. I come from here.');
    const jotunheim = new Realm('jotunheim', 'The world of giants. Try not to get stepped on.');
    const muspelheim = new Realm('muspelheim', 'The world of fire giants. It\'s really hot.');
    const nidavellir = new Realm('nidavellir', 'The world of dwarves. Greate place to find Short stout grubby little miners hunting for gold');
    const alfheim = new Realm('alfheim', 'The world of light elves. You ever heard of light elf privilege. No? THey get treated better than dark elves that\'s for sure.');
    const svartalfheim = new Realm('svartalfheim', 'YOu ever live in the hood and get mistreated because the color of your skin. THey don\'t like the other realms for good reason.');
    const asgard = new Realm('asgard', 'The world of asgardians. Odin and THor live here. They\'re pricks too.');
    const vanaheim = new Realm('vanaheim', 'The world of vanir. If gods could be hippies, this is it. They\'re ok.');
    const helheim = new Realm('helheim', 'The realm of the dishonored dead. I don\'t see dying in your sleep or in peace as dishonorable. The norse are savages imo.');

    const jormungandr = new Monster('jormungandr', 'World serpent so big he reaches around Midgard');
    const fenrir = new Monster('fenrir', 'he\'s a wolf');
    const squirrel = new Monster('squirrel', 'his real name is ratatoskir or something but I\'m not typing that out');

    const realmImgMap = [
        [ 'cosmos', 'https://images.squarespace-cdn.com/content/v1/56c8a28f7c65e44270c2e4a4/1534536029343-82O5401X5540ED8Q4CE0/James_Firnhaber_9_from_The_Nine_Worlds+copy.jpg?format=500w'],
        [ 'midgard', 'https://thumbs.dreamstime.com/b/earth-blue-planet-space-5803790.jpg'],
        [ 'jotunheim', 'https://images.squarespace-cdn.com/content/v1/56c8a28f7c65e44270c2e4a4/1540491603136-J77YLGKUPMTHP5OUGZ59/James_Firnhaber_Jotunheim.jpg?format=500w'],
        [ 'muspelheim','https://images.squarespace-cdn.com/content/v1/56c8a28f7c65e44270c2e4a4/1540491362879-US93S2SIW3J05KKEF29P/James_Firnhaber_Muspellheim.jpg?format=500w'],
        [ 'nidavellir','https://cf.geekdo-images.com/PX7t5xXDLI2XqxoTShLayg__itemrep/img/-2DjDG1x3IfG1mAu-xACSDSfWfw=/fit-in/246x300/filters:strip_icc()/pic5039625.jpg'],
        [ 'alfheim', 'https://blog.vkngjewelry.com/wp-content/uploads/2020/02/Norse-Mythology_-Alfheim.png'],
        [ 'helheim', 'https://images.squarespace-cdn.com/content/v1/56c8a28f7c65e44270c2e4a4/1540491641015-UX86RBS0H0RRQ2G1PP5R/James_Firnhaber_Helheim.jpg?format=500w'],
        [ 'svartalflheim','https://blog.vkngjewelry.com/wp-content/uploads/2020/06/The-Norse-Cosmos_-Niflheim-768x432.png'],
        [ 'asgard', 'https://pbs.twimg.com/media/FoJQGSnXEAA0SuK?format=jpg&name=4096x4096'],
        [ 'vanaheim' ,'https://i.pinimg.com/736x/37/25/c2/3725c2a45a3c845ee3c7102704b0360c.jpg'],
    ]

    const nineRealms = [
        cosmos,
        midgard,
        jotunheim,
        muspelheim,
        nidavellir,
        alfheim,
        helheim,
        svartalfheim,
        asgard,
        vanaheim,
    ];




    const nineRealmsDiv = $.getElementById('nine-realms');

    // IMAGE
    let img = $.createElement('img');
    img.src = 'https://images.squarespace-cdn.com/content/v1/56c8a28f7c65e44270c2e4a4/1534536029343-82O5401X5540ED8Q4CE0/James_Firnhaber_9_from_The_Nine_Worlds+copy.jpg?format=500w';
    img.alt = 'Realm';
    nineRealmsDiv.appendChild(img);
    

    const div = $.createElement('div');
    const btnDiv = $.createElement('div');
    nineRealms.forEach( (e) =>  {
        
        // div.innerHTML = `${e.describe()}`;
        // 
        const btn = $.createElement('button');
        btn.textContent = `Go to ${e.name}`;
        btn.addEventListener('click', () => {
            for (let i=0; i < realmImgMap.length; i++){
                if (e.name === realmImgMap[i][0]){
                    img.src = realmImgMap[i][1];
                }
            }
            div.innerHTML = `<h2>${e.name}</h2> ${e.desc}`;
        });
        btnDiv.appendChild(btn);
    });
    nineRealmsDiv.appendChild(div);
    nineRealmsDiv.appendChild(btnDiv);
    console.log('[9 realms]: DONE');
})


// START TODO
function setupTodo(){
    const todoDiv = document.getElementById('todo');
    const title = document.createElement('h2');
    title.textContent = 'to do';
    
    const todo1 = document.createElement('div');
    todo1.innerHTML = '<p>*[2/13/25] The javascript file that runs this page is almost 700 lines now and is becoming \
        unmanageable. Find solution for splitting up the file. <a href=\'https://www.reddit.com/r/learnjavascript/comments/cg935a/comment/eufl1jv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button\' \
        >here</a> </p>';
    
    
    todoDiv.appendChild(title);
    todoDiv.appendChild(todo1);
    
}
// END TODO

function setUpProjectLinks(){
    const projectList = ['mood-simulator', 'rpg'];
    const projectDiv = $.getElementById('project-links');
    
    projectList.forEach((e) => {
        let a = $.createElement('a');
        a.href=`./${e}/index.html`;
        a.textContent = `${e}`;
        projectDiv.appendChild(a);
    });
    
    
    
}

// START main
window.onload = main();

function main() {
    // Home quote
    const homeQuote = document.getElementById("home-quote");
    homeQuote.innerHTML = '<h1>HOME</h1>' + `<p>${getRandomElement(homeQuotes)}</p`;

    // Dark mode functionality
    darkModeButton = document.getElementById("dark-mode-toggle");
    darkModeButton.addEventListener("click", () => {
        {
            document.body.classList.toggle('dark-mode');
        }
    });

    // change background color
    document.getElementById("mybody").classList.add("bg-color");
    
    setupNineRealms();
    // SEtup todo list
    setupTodo();
    // Interesting Links
    setupInterestingLinks();
    setUpProjectLinks();
    //death-game
    setupDeathGame();

    // nekos api
    setupNekosApi();

    // setup WaifuIm

    setupWaifuIm();

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