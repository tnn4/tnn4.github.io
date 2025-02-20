$ = document;



let currentEmotion = 'neutral';
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

let num = 0;
let text = '';
const changeEmotion = () => {
    console.log(`selectedNum = ${num}`);
    const numOfEmotions = emotions.length;

    num = getRandomInt(1,12);
    if (num >= 1 && num <= 2) {
        currentEmotion = 'neutral';
    } 
    if (num >= 3 && num <= 4){
        currentEmotion = 'angry';
    }
    if (num >= 5 && num <= 6) {
        currentEmotion = 'sad';
    }
    if (num >= 7 && num <= 8) {
        currentEmotion = 'bored';
    }
    if (num >= 9 && num <= 10) {
        currentEmotion = 'confused';
    }
    if (num >= 11 && num <= 12) {
        currentEmotion = 'happy';
    }
    
    text = '';
    const selectText = () => {
        
        const texts = {
            "neutral": ['', 'hi'],
            "angry": ['grrr', 'go away'],
            "sad": ['*sob*', 'why?'],
            "bored": ['eh', 'meh', '...'],
            "confused": ['what?', 'why?'],
            "happy": ['he he', 'lol', 'hur hur']
        }
        let rng = getRandomInt(0, texts[currentEmotion].length-1);
        return texts[currentEmotion][rng];
    }
    text = selectText();
}

setInterval(changeEmotion, 2000);

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

function update(timestamp) {
    if (timestamp - lastFrameTime >= frameDuration) {
        currentFrame = (currentFrame + 1) % totalFrames;
        lastFrameTime = timestamp;
    }
    draw();
    talk(currentEmotion);
    requestAnimationFrame(update);
    
}

const unit =32;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const frameX = (currentFrame % totalFrames) * spriteWidth;
    // ctx.drawImage(spriteSheet, frameX, 0, spriteWidth, spriteHeight, 100, 100, spriteWidth, spriteHeight);
    //ctx.drawImage(spriteSheet, frameX, 0, spriteWidth, spriteHeight, canvas.width/2, canvas.height/2, spriteWidth, spriteHeight);
    drawFace(currentEmotion);
    
}

const talk = (emotion) => {

    ctx.font = "48px arial";
    ctx.fillStyle = "black"
 
    ctx.fillText(text, originX - unit, originY + 5*unit);
}

/*
      6
    5   7

*/


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

    //console.log(`[EMOTION]: ${emotion}`)
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

function drawNeutral() {
    const counterClockwise = true;
    const unit = 32;
    
    const drawFace = () => {
        ctx.beginPath();
        const x = originX;
        const y = originY;
        const radius = unit *3;
        const startAngle = 0;
        const endAngle = radEnd;
        ctx.arc(x,y, radius, startAngle, endAngle);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    drawFace();

    const eyeSize = unit *.8;

    // draw left eye
    ctx.beginPath();
    const x = originX-1*unit;
    const y = originY;
    const radius = eyeSize;
    const startAngle = 0;
    const endAngle = radEnd;
    const radian1 = 0;
    const radian2 = Math.PI*2;
    
    ctx.fillStyle = "white";
    ctx.arc(x,y, radius, radian1, radian2, counterClockwise);
    ctx.fill();

    // draw right eye
    ctx.beginPath();
    const x2 = originX+1*unit;
    const y2 = originY;
    const radius2 = eyeSize;
    const startAngle2 = getRadiansFromDegrees(0);
    const endAngle2 = getRadiansFromDegrees(135);
    const radian21 = 0;
    const radian22 = radEnd;
    ctx.fillStyle = "white";
    ctx.arc(x2,y2, radius2, radian21, radian22);
    ctx.fill();
}

function drawAngry() {
    const counterClockwise = true;
    const unit = 32;
    const eyeSize = unit *.8;

    
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
    const drawLeftEye = () => {
        ctx.beginPath();
        const x = originX-1*unit;
        const y = originY;
        const radius = eyeSize;
        const startAngle = getRadiansFromDegrees(315);
        const endAngle = getRadiansFromDegrees(135);
        const radian1 = 5*Math.PI/4;
        const radian2 = Math.PI/4;
        ctx.fillStyle = "white";
        ctx.arc(x,y, radius, radian1, radian2, counterClockwise);
        ctx.fill();
    }
    drawLeftEye();

    // draw right eye
    const drawRightEye = () => {
        ctx.beginPath();
        const x2 = originX+1*unit;
        const y2 = originY;
        const radius2 = eyeSize;
        const startAngle2 = getRadiansFromDegrees(0);
        const endAngle2 = getRadiansFromDegrees(135);
        const radian21 = 7*Math.PI/4
        const radian22 = 3*Math.PI/4;
        ctx.fillStyle = "white";
        ctx.arc(x2,y2, radius2, radian21, radian22);
        ctx.fill();
    }


}

spriteSheet.onload = () => {
    requestAnimationFrame(update);
};