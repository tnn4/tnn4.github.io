// Script for getting random waifus from https://waifu.im
// var globals
// let scoped

// see: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = ms => new Promise(res => setTimeout(res, ms));


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

async function showImageThenDelete(img_src="https://nekos.best/api/v2/shoot/4729a845-d48c-4420-a46f-3afa0b5d6a49.gif", ms=2000) {
    const img = document.createElement('img');
    console.log('img_src = '+img_src);
    img.src = img_src; // Replace with your image URL
    img.alt = 'Sample Image';
    img.id = 'tempImage';
    document.getElementById('image-container').appendChild(img);
    // Compensating if user mistakes seconds instead
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
let trials = 0;
let maxBullets = 5;
let triesLeft = 5;
let cartridge = [true,false,false,false,false,false];
let gameOver = false;
var probability = function(n) {
    return !!n && Math.random() <= n;
};

async function setupDeathGame() {
    const deathGame = document.getElementById('death-game');
    deathGame.innerHTML = '<h2>Russian Roulette</h2><p>Instructions: Press NEW GAME. Then SHOOT. The chamber will be spun and the fates will decide if you live or die. Enter a new probability to change chance [0-1](Russian Roulete ~1/6 or .17):</p>';
    const bulletsDiv = document.createElement('div');
    
    const tempImageContainer = document.createElement('div');
    tempImageContainer.id = 'image-container';

    const triesLabel = document.createElement('div');
    triesLabel.innerHTML = "<p>Attempts to survive (put 100 if you're a mashochist):</p>"
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
    
    const executeProbBtn = document.createElement('button');
    executeProbBtn.textContent = 'SHOOT';
    
    const outcomeDiv = document.createElement('div');
    executeProbBtn.addEventListener("click", async function getSuccess() {
        
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
        
        //cartridge +='<p>';
        /*
        for(i=0;i<maxBullets;i++){
            cartridge[i] = "";
        }
        for(i=0;i<triesLeft;i++){
            cartridge[i] = "[]";
        }
        */
        // cartridge +='</p>';
        // bulletsDiv.innerHTML = cartridge;
        // deathGame.appendChild(bulletsDiv);
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
                showImageThenDelete(url,3);
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
    });
    deathGame.appendChild(triesLabel);
    deathGame.appendChild(triesInput);
    
    
    deathGame.appendChild(startGameBtn);
    deathGame.appendChild(probInput);
    deathGame.appendChild(executeProbBtn);
    deathGame.appendChild(tempImageContainer);
    deathGame.appendChild(outcomeDiv);
    
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

window.onload = main();

function main() {
    setupDeathGame();
}