$ = document;
let debug = false;
const setupDebugBtn = () => {
    const btn = $.createElement('button');
    btn.textContent = 'debug';
    btn.addEventListener('click', () => {
        console.log(`debug: ${debug}`);
        debug = !debug;
    })
    $.body.appendChild(btn);
}
setupDebugBtn();
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution! \
 * see: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const probabilityLessThanOrEqual = function(n) {
    return !!n && Math.random() <= n;
};
/**
 * Checks if a value is between smaller( min) and greater( max) \
 * If min > max the function will throw an error
 * e.g. valueIsBetween(2,3,4) >> false
 * valueIsBetween(3.5,3,4) >> true
 * @param {*} value - value to check
 * @param {*} min - smaller value
 * @param {*} max - bigger value
 * @returns boolean true if value is between min and max
 */
const valueIsBetween = (value, min,max) =>{
    if (min > max){
        throw new error("min must be smaller than max")
    }
    return value >= min && value < max
}

let currentEmotion = 'neutral';

// arousal_level: low, neutral, high
// mood: positive, neutral, negative
// a: low, mood: + >> neutral
// a: low, m: - >> sad

// a: high, mood: + >> happy
// a: high, mood: - >> angry

// thoughts:
// sad thought >> -mood
// fearful thought >> -mood, ^arousal
// happy though >> +mood, +arousal

const thoughtType = {
    NEUTRAL:Symbol('NEUTRAL'),
    FEARFUL:Symbol('FEARFUL'),
    ANGRY:Symbol('ANGRY'),
    SAD:Symbol('SAD'),
}

// social media active? change the probability of angry thought
// bad weather? raining >> higher probability of sad thought
// meditating?
// 1 thought every 10 seconds
let mood = 0;
let arousal = 0;
let currentEnvironment = "quiet";
const environment = {
    // noise pollution
    noisy:false,
    // social media use
    usingSocialMedia: false,
    // bad weather >> SAD
    badWeather: false, 
}

// environment influences thought patterns
const changeEnvironment = () => {
    let probability = function(n) {
        return !!n && Math.random() <= n;
    };
    
    if(probability(0.5)){
        environment.noisy = !environment.noisy;
    }
    if(environment.usingSocialMedia === false){
        if(probability(0.8)){
            environment.usingSocialMedia = true;
        } 
    } else {
        if(probability(0.3)){
            environment.usingSocialMedia = false;
        }
    }
    if(probability(0.3)){
        environment.badWeather = !environment.badWeather;
    }
    if (debug) {
        console.log(`[Environment]: noisy? ${environment.noisy}, social media? ${environment.usingSocialMedia}, bad weather? ${environment.badWeather} `);
    }
    
}
setInterval(changeEnvironment, 4000);


// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let thought;
const generateThought = () => {
    let probability = function(n) {
        return !!n && Math.random() <= n;
    };
    // 4/10 >> neutral thought
    // 1/10 >> fearful thought
    // 2/10 >> angry thought
    // 1/10 >> sad thought
    const neutralChance = 0.4;
    let happyChance;
    let fearChance;
    let angryChance;
    let sadChance;
    let NOISE_MODIFIER = 0;
    let SOCIAL_MEDIA_MODIFIER = 0;
    let BAD_WEATHER_MODIFIER = 0;
    if (environment.noisy === true){
        NOISE_MODIFIER = 1.3;
    } else {
        NOISE_MODIFIER = 1;
    }
    if (environment.usingSocialMedia === true){
        SOCIAL_MEDIA_MODIFIER = 1.5;
    } else {
        SOCIAL_MEDIA_MODIFIER = 1;
    }
    if (environment.badWeather === true){
        BAD_WEATHER_MODIFIER = 1.3;
    } else {
        BAD_WEATHER_MODIFIER = 1;
    }

    happyChance = 0.4 * 1/NOISE_MODIFIER * 1/SOCIAL_MEDIA_MODIFIER * 1/BAD_WEATHER_MODIFIER;
    fearChance = 0.3 * NOISE_MODIFIER * SOCIAL_MEDIA_MODIFIER * BAD_WEATHER_MODIFIER;
    angryChance = 0.2 * NOISE_MODIFIER * SOCIAL_MEDIA_MODIFIER * BAD_WEATHER_MODIFIER;
    sadChance = 0.1 * NOISE_MODIFIER * SOCIAL_MEDIA_MODIFIER * BAD_WEATHER_MODIFIER;
    // split
    // bucket = 100
    // bucket * happyProb  >> 40 length
    // bucket * fearProb >> 30
    // bucket * angryProb >> 20
    // bucket * sadProb >> 10

    const capMoodAndArousal = () => {
        if(mood <= -3){
            mood = -3;
        }
        if(mood >= 3){
            mood = 3;
        }
        if(arousal >= 3){
            arousal = 3;
        }
        if(arousal < 0){
            arousal = 0;
        }
    }
    capMoodAndArousal();
    if(debug){
        console.log(`[thoughts] happy%: ${happyChance}, fear%: ${fearChance}, angry%: ${angryChance}, sad%: ${sadChance}`);
    }
    
    let selectedNum = Math.random();
    // replace with math(random)
    if(valueIsBetween(selectedNum, 0, 0.4)){

        mood += getRandomArbitrary(0.5,0.7);
        arousal += getRandomArbitrary(0.2,0.3);

        thought = ':)';
    } 
    if(valueIsBetween(selectedNum, 0.4, 0.6)){
        
        mood -= getRandomArbitrary(0.3,0.4);
        arousal += getRandomArbitrary(0.1,0.2);
        thought = 'O_O';
    }
    if(valueIsBetween(selectedNum, 0.6, 0.8)){
        
        mood -= getRandomArbitrary(0.3,0.4);
        arousal += getRandomArbitrary(0.1,0.2);
        
        thought = '>:(';
    }
    if(valueIsBetween(selectedNum, 0.8, 1)){
        
        mood -= getRandomArbitrary(0.3,0.5);
        arousal -= getRandomArbitrary(0.5,0.7);
        thought = ':C';
    }


    
    
}
setInterval(generateThought, 100);

const printStats = () => {
    console.log(`[THOUGHT GENERATED] ${thought}`);
    console.log(`arousal: ${arousal} mood: ${mood}`);
}
setInterval(printStats, 2000);

class emotion {
    static NEUTRAL = 'neutral';
    static ANGRY = 'angry';
    static SAD = 'sad';
    static BORED = 'bored';
    static CONFUSED = 'confused';
    static HAPPY = 'happy';
}

const emotions = [
    'neutral',
    'angry',
    'sad',
    'bored',
    'confused',
    'happy',
];

const emotionTime = {
    neutralTime:0.001,
    angryTime:0.001,
    sadTime:0.001,
    boredTime:0.001,
    confusedTime:0.001,
    happyTime:0.001,
    accumulateEmotionTime(emotion, dt){
        if (emotion === 'neutral'){
            this.neutralTime += dt;
        }
        if (emotion === 'angry'){
            this.angryTime += dt;
        }
        if (emotion === 'sad'){
            this.sadTime += dt;
        }
        if (emotion === 'bored'){
            this.boredTime += dt;
        }
        if (emotion === 'confused'){
            this.confusedTime += dt;
        }
        if (emotion === 'happy'){
            this.happyTime += dt;
        }
    },
    getTotalTime() {
        return this.neutralTime + this.angryTime +
        this.sadTime + this.boredTime + this.confusedTime + 
        this.happyTime;
    },
    printEmotionPercentage(){
        let totaltime = this.getTotalTime();
        let nCent = this.neutralTime / totaltime * 100;
        let aCent = this.angryTime / totaltime * 100;
        let sCent = this.sadTime / totaltime * 100;
        let bCent = this.boredTime / totaltime * 100;
        let cCent = this.confusedTime / totaltime * 100;
        let hCent = this.happyTime / totaltime * 100;
        nCent = nCent.toPrecision(2);
        aCent = aCent.toPrecision(2);
        sCent = sCent.toPrecision(2);
        bCent = bCent.toPrecision(2);
        cCent = cCent.toPrecision(2);
        hCent = hCent.toPrecision(2);

        
        console.log(`N: ${nCent} ,${aCent}%,S: ${sCent}%,B: ${bCent}%,C: ${cCent}%, H:${hCent}%, `);
        let text = `% time in Mood: o_o = ${nCent}% // :) = ${hCent}% // >< = ${aCent}% // :c = ${sCent}% // -_- = ${bCent}% //o_0 = ${cCent}%`;
        ctx.fillStyle = 'black';
        ctx.font = '12px arial';
        ctx.fillText(text, originX-8*unit, originY+5*unit);
    }
}

let num = 0;
let text = '';
// state machine
const changeEmotion = () => {
    
    const numOfEmotions = emotions.length;

    // calculate time spent in each mood
    if (arousal === 0 && mood === 0) {
        currentEmotion = 'neutral';
    } 
    if (arousal > 2 &&  mood < 0){
        currentEmotion = 'angry';
    }
    if ( arousal < 2 && mood < 0) {
        currentEmotion = 'sad';
    }
    if (arousal === 0 && mood < 1) {
        currentEmotion = 'bored';
    }
    if ( arousal > 1 && mood > 1) {
        currentEmotion = 'happy';
    }
    return currentEmotion;
}
// setInterval(changeEmotion, 100);

const pi = Math.PI;

// const radians = new Radians();

class Radians {
    constructor(){

    }
    static START = 0;
    static _1 = pi/4;
    static _2 = 2*pi/4;
    static _3 = 3*pi/4;
    static HALF = pi;
    static _5 = 5*pi/4;
    static _6 = 6*pi/4;
    static _7 = 7*pi/4;
    static END = 2*pi;
}

const radStart = 0;
const rad1 = pi/4;
const rad2 = 2*pi/4;
const rad3 = 3*pi/4;
const radHalf = pi;
const rad5 = 5*pi/4;
const rad6 = 6*pi/4;
const rad7 = 7*pi/4;
const radEnd = 2*pi;


const radianHalf = Math.PI;
const radianEnd = Math.PI*2;


const canvas = document.getElementById('spriteCanvas');
const ctx = canvas.getContext('2d');

const originX = canvas.width/2;
const originY = canvas.height/2;

const spriteSheet = new Image();
spriteSheet.src = './superintendent.png'; // Update with your spritesheet path

const spriteWidth = 32; // Width of a single sprite frame
const spriteHeight = 32; // Height of a single sprite frame
const totalFrames = 6; // Total number of frames in the spritesheet
let currentFrame = 0;

const fps = 5; // Frames per second
const frameDuration = 1000 / fps;
let lastFrameTime = 0;

const getRadiansFromDegrees = (degrees) => {
    return (Math.PI/180)*degrees
}


const unit =32;


const talk = (emotion) => {

    ctx.font = "48px arial";
    ctx.fillStyle = "black"
 
    ctx.fillText(text, originX - unit, originY + 5*unit);
}

/*
      6
    5   7

*/
/*
    wave >> neutral
    smile >> happy
    insult >> [sad, angry]
    joke >> [angry, confused, happy]
    yawn >> [neutral, bored]
*/

let currentAction = '';
const setupActionButtons = () => {
    let probability = function(n) {
        return !!n && Math.random() <= n;
   };
    
    const actionsBtnDiv = $.createElement('div');
    $.body.appendChild(actionsBtnDiv);
    const actions = [
        "wave",
        "smile",
        "insult",
        "joke",
        "yawn",
    ];
    actions.forEach( action => {
        const btn = $.createElement('button');
        btn.id = `${action}-btn`;
        btn.textContent = `${action}`;
        btn.addEventListener('click', () =>{
            currentAction = action;
            switch(action) {
                case 'wave':
                    if (currentEmotion !== 'angry'){
                        if(probability(0.7)){
                            mood += 1;
                            text = '*wave*';
                        }
                    }
                    break;
                case 'smile':
                    if (currentEmotion !== 'happy'){
                        if(probability(0.7)){
                            mood += 1;
                            text = ':)'
                        } else {
                            text = '...'
                        }
                    }
                    break;
                case 'insult':
                    if (currentEmotion !== 'sad' || currentEmotion !== 'angry'){
                            if(probability(0.5)){
                                mood -= 2;
                                text = 'y so mean?'
                            }
                    }
                    break;
                case 'joke':
                    
                    if (currentEmotion ===  'angry'){
                        if(probability(0.7)){
                            mood -= getRandomArbitrary(0.7,0.1);
                            text = 'you making fun of me?';
                        } else {
                            mood += getRandomArbitrary(0.7,0.1);
                            text = 'pretty funny';
                        }
                    } else {
                        if(probability(0.7)){
                            mood += getRandomArbitrary(0.7,0.1);;
                            text = 'lol';
                        } else {
                            currentEmotion = 'confused';
                            text = '?';
                        }
                    }
                    break;
                case 'yawn':
                    if (currentEmotion !== 'bored'){
                        if(probability(0.7)){
                            arousal -= getRandomArbitrary(1,1.5);
                            text = 'yawn';
                        }
                    }
                    break;
            }
        });
        actionsBtnDiv.appendChild(btn); 
    })
}
setupActionButtons();

const setupEmotionButtons = () => {
    const emotionsButtonDiv = $.createElement('div');
    $.body.appendChild(emotionsButtonDiv);

    emotions.forEach(emotion => {
        const btn = $.createElement('button');
        btn.id = `${emotion}-btn`;
        btn.textContent = `${emotion}`;
        btn.addEventListener('click', () =>{
            currentEmotion = emotion;
        });
        emotionsButtonDiv.appendChild(btn);
    });
}
setupEmotionButtons();




/**
 * neutral (0>>rad.END)o (0>> rad.END)o
 * angry (rad.5 >> rad.1)\ (rad.7 >> rad.3)/ 
 * sad (rad.7 >> rad.3)/ (rad.5 >> rad.1)\
 * bored (0 >> rad.HALF)c (0 >> rad.HALF)c
 * confused (0 >> rad.END)o (0> rad.HALF)_
 * happy (0 >> rad.HALF)cC (0 >> rad.HALF)cC
 */
function drawFace(emotion='neutral') {

    
    const radians = new Radians();
    const counterClockwise = true;
    const unit = 32;
    const eyeSize = unit *.8;

    let angleL1 = 0;
    let angleL2 = 2*pi;
    let angleR1 = 0;
    let angleR2 = 2*pi;

    let cL = false;
    let cR = false;
    switch(emotion){
        case 'neutral':
            
            angleL1 = radStart; angleL2 = 2*Math.PI;
            angleR1 = radStart; angleR2 = radEnd;
            break;
        case 'angry':
            
            cL = true;
            angleL1 = rad5; angleL2 = rad1;
            angleR1 = rad7; angleR2 = rad3;
            break;
        case 'sad':
            
            angleL1 = rad7; angleL2 = rad3;
            angleR1 = rad1; angleR2 = rad5;
            break;
        case 'bored':
            angleL1 = radStart; angleL2 = radHalf;
            angleR1 = radStart; angleR2 = radHalf;
            break;
        case 'confused':
            let num = getRandomInt(1,2);
            angleL1 = radStart; angleL2 = radEnd;
            angleR1 = radStart; angleR2 = radHalf;
            break;
        case 'happy':
            // counterclockwise
            cL = true;
            cR = true;
            angleL1 = radStart; angleL2 = radHalf;
            angleR1 = radStart; angleR2 = radHalf;
            break;
        default:
            currentEmotion = 'neutral';
            break;
    }
    //console.log(`switched to ${emotion}`)
    //console.log(`l1 = ${angleL1}, l2 =${angleL2}, r1 =  ${angleR1}, r2 = ${angleR2} ` )    

    const drawFace = () => {
        ctx.beginPath();
        const x = originX;
        const y = originY;
        const radius = 96;
        const startAngle = 0;
        const endAngle = Math.PI*2;
        ctx.arc(x,y, radius, startAngle, endAngle);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    drawFace();

    // draw left eye
    const drawEyeL = (angleL1, angleL2) => {
        ctx.beginPath();
        const x = originX-1*unit;
        const y = originY;
        const radius = eyeSize;
        const startAngle = getRadiansFromDegrees(315);
        const endAngle = getRadiansFromDegrees(135);
        const radian1 = 5*Math.PI/4;
        const radian2 = Math.PI/4;
        ctx.fillStyle = "white";
        ctx.arc(x,y, radius, angleL1, angleL2, cL);
        ctx.fill();
    }
    drawEyeL(angleL1, angleL2);

    // draw right eye
    const drawEyeR = (angleR1, angleR2) => {
        ctx.beginPath();
        const x2 = originX+1*unit;
        const y2 = originY;
        const radius2 = eyeSize;
        const startAngle2 = 7*Math.PI/4;
        const endAngle2 = 3*Math.PI/4;
        ctx.fillStyle = "white";
        ctx.arc(x2,y2, radius2, angleR1, angleR2, cR);
        ctx.fill();
    }
    drawEyeR(angleR1, angleR2)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const frameX = (currentFrame % totalFrames) * spriteWidth;
    // ctx.drawImage(spriteSheet, frameX, 0, spriteWidth, spriteHeight, 100, 100, spriteWidth, spriteHeight);
    //ctx.drawImage(spriteSheet, frameX, 0, spriteWidth, spriteHeight, canvas.width/2, canvas.height/2, spriteWidth, spriteHeight);
    drawFace(currentEmotion);
    talk();
}

let totalFrameTimeUntilEmotionChange = 0;
function update(timestamp) {
    if (timestamp - lastFrameTime >= frameDuration) {
        currentFrame = (currentFrame + 1) % totalFrames;
        lastFrameTime = timestamp;
    }
    let lastEmotion = currentEmotion;
    totalFrameTimeUntilEmotionChange += frameDuration;
    currentEmotion = changeEmotion();
    if (currentEmotion !== lastEmotion){
        emotionTime.accumulateEmotionTime(lastEmotion, totalFrameTimeUntilEmotionChange);
        totalFrameTimeUntilEmotionChange = 0;
    }
    
    // talk(currentEmotion);
    requestAnimationFrame(update);
    draw();
    // draw text
    ctx.fillStyle = 'black';
    ctx.font = '12px arial';
    let formattedMood = mood.toPrecision(3);
    let formattedArousal = arousal.toPrecision(3);   
    ctx.fillText(`mood: ${formattedMood}/ stimulation_level:${formattedArousal}`, originX, originY - 5*unit );
    // END draw text
    emotionTime.printEmotionPercentage();
}


spriteSheet.onload = () => {
    requestAnimationFrame(update);
};