// Script for getting random waifus from https://waifu.im
// EDIT:  This script has become the homepage. oops

// absence of var, let, const means global e.g x=1 , x is global
// var globals
// let scoped

// hey its jquery lite!
const $ = document;

// see: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = ms => new Promise(res => setTimeout(res, ms));

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
    
    // SEtup todo list
    setupTodo();
    // Interesting Links
    setupInterestingLinks();

    //death-game
    setupDeathGame();

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