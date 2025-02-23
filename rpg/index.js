const $ = document;

function getRandomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
}

/*
var chooser = randomNoRepeats(['Foo', 'Bar', 'Gah']);
chooser(); // => "Bar"
chooser(); // => "Foo"
chooser(); // => "Gah"
chooser(); // => "Foo" -- only repeats once all items are exhausted.
*/

function getUuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

function getRandomFromArray(array){
    const randomIndex = Math.floor(Math.random()*array.length)
    return array[Math.floor(Math.random()*array.length)];
}

function getRandomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

/**
 * Print out fields of objct
 */
function iterateObject(obj){
    for (let [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }
}

class Room{
    constructor(name, desc, npcs, connections, locked){
        //id
        this.id = getUuidv4();
        //goes to id of list of rooms
        this.name = name;
        this.desc = desc;
        this.npcs = npcs;
        this.connections = connections;
        this.locked = locked;
    }
    
    goesTo(){
        for (let i=0;i<this.goesTo.length;i++){
            console.log(`${this.id} goes to ${this.connections[i]}`);
        }
    }
}

class Stats{
    constructor(edge,heart,iron,wit,shadow){
        // 32211
        this.heart = heart;
        this.iron = iron;
        this.edge = edge;
        this.wit = wit;
        this.shadow = shadow;
    }
    static getStats(){
        let startingStats = [3,2,2,1,1];
        shuffle(startingStats);
        const heart = startingStats[0];
        const iron = startingStats[1];
        const edge = startingStats[2];
        const wit = startingStats[3];
        const shadow = startingStats[4];

        return new Stats(heart, iron, edge, wit, shadow);
    }
}

const alignment = {
    morality: ['good', 'neutral', 'evil'],
    disposition: ['lawful', 'neutral', 'chaotic']
}

const getAlignment = () => {
    let ls = [];
    const m = getRandomFromArray(alignment['morality']);
    const d = getRandomFromArray(alignment['disposition']);
    ls.push(d);
    ls.push(m);
    return ls;
}

const colors = ['w','u','b','r','g']

class Colors{

    constructor(str){
        this.w = 0;
        this.u = 0;
        this.b = 0;
        this.r = 0;
        this.g = 0;
        if (str === ''){
            console.warn('Using empty string returns nothing');
            return;
        }
        
        if(str.includes('w')){
            this.w = 1;
        }
        if(str.includes('u')){
            this.u = 1;
        }
        if(str.includes('b')){
            this.b = 1;
        }
        if(str.includes('r')){
            this.r = 1;
        }
        if(str.includes('g')){
            this.g = 1;
        }
    }
    // wubrg
    // 0 00000
    // 1 10000 01000 00100 00010 00001
    // 2F 11000 01100 00110 00011 10001
    // 2E 10100 01010 00101 10010 01001
    // 3 shard
    // 11100 01110 00111 10011 11001
    // 3 wedge
    // 11010 01101 10110 01011 10101
    static getCommonName (str){
        //ls = [];
        //ls.push(this.w);ls.push(this.u);ls.push(this.b);ls.push(this.r);ls.push(this.g);
        //str = ls.join('');
        str = str.toLowerCase();
        let c = ['0','0','0','0','0'];
        if(str.includes('w')){
            c[0] = 1;
        }
        if(str.includes('u')){
            c[1] = 1;
        }
        if(str.includes('b')){
            c[2] = 1;
        }
        if(str.includes('r')){
            c[3] = 1;
        }
        if(str.includes('g')){
            c[4] = 1;
        }
        let c2 = c.join('');
        switch (c2){
            case '11000':
                return 'azorius';
            case '01100':
                return 'dimir';
            case '00110':
                return 'rakdos';
            case '00011':
                return 'gruul';
            case '10001':
                return 'simic';
            case '10100':
                return 'orzhov'
            case '01010':
                return 'izzet';
            case '00101':
                return 'golgari'
            case '10010':
                return 'boros'
            case '01001':
                return 'simic'
            // shards
            // bant, grixis, naya, jund, esper 
            case '11100':
                return 'esper' 
            case '01110':
                return 'grixis' 
            case '00111':
                return 'jund' 
            case '10011':
                return 'naya'
            case '11001':
                return 'bant'
            // wedge
            case '11010':
                return 'jeskai';
            case '01101':
                return 'sultai'
            case '10110':
                return 'mardu' 
            case '01011':
                return'temur' 
            case '10101':
                return 'abzan'
            default:
                return 'no matching names'
        }
    }
}

const getNColors = (n) => {
    let ls = [];
    chooser = getRandomNoRepeats(colors);
    for(let i=0; i<n; i++){
        ls.push(chooser());
    }

    return ls;
}

class Big5 {
    constructor(o,c,e,a,n){
        this.openess = o; // vs closed
        this.conscientiousness = c; // vs unconscientious
        this.extraversion = e; // vs introverted
        this.agreeableness = a; // vs unagreeable
        this.neuroticism = n; //anxious vs relaxed 
    }
    // -2,-1,0,1,2
    describe(){
        let o,c,e,a,n;
        
        if (this.openess > 0 ){
             o = 'open to new experiences';
        } else {
            o = 'wary new things';
        }
        if (this.conscientiousness > 0){
            c = ''
        } else {

        }
        if (this.extraversion > 0 ){
            o = 'extroverted';
       } else {
           o = 'introverted';
       }
       if (this.agreeableness > 0 ){
        o = 'friendly';
        } else {
        o = 'irritable';
        }
        if (this.neuroticism > 0 ){
            o = 'anxious';
        } else {
            o = 'relaxed';
        }
        return o,c,e,a,n;
    }
}

class ColorPie {
    static associations = {
        w: ['authority', 'compassion', 'community', 'contribution', 'fairness', 'happiness', 'honesty', 'justice', 'kindness', 'leadership', 'peace', 'religion', 'responsibility', 'security', 'service', 'trustworthiness', 'altruism', 'cleanliness', 'commitment', 'consistency', 'duty', 'conviction', 'courtesy', 'dedication', 'discipline', 'endurance', 'gratitude', 'honor', 'integrity', 'patience', 'poise', 'respect', 'teamwork', 'tradition', 'unity', 'valor', 'honor', 'formality', 'generosity', 'protectiveness', 'asceticism', 'authoritarianism', 'morality', 'fanaticism', 'intolerance'],
        u: ['challenge', 'competence', 'creativity', 'curiosity', 'knowledge', 'optimism', 'accuracy', 'adaptability', 'awareness', 'brilliance', 'cleverness', 'concentration', 'development', 'efficiency', 'foresight', 'imagination', 'insight', 'logic', 'quality', 'rigor', 'trickery', 'strategy', 'service', 'truth', 'vision', 'wonder', 'perception', 'nuance', 'aspiration', 'focus', 'invention', 'patience', 'wordplay', 'rationality', 'subtlety', 'scholarship', 'absent-mindedness', 'cerebral', 'deception', 'enigmatic', 'skepticism', 'aloofness'],
        b: [ 'achievement', 'autonomy', 'determination', 'fame', 'influence', 'pleasure', 'popularity', 'reputation', 'success', 'status', 'wealth', 'ambition', 'control', 'dignity', 'excellence', 'improvement', 'innovation', 'liberty', 'mastery', 'performance', 'power', 'self-reliant', 'talented', 'undaunted', 'decisive', 'relentless', 'industrious', 'persuasive', 'realistic', 'suave', 'competitive', 'political', 'proud', 'solitary', 'uninhibited', 'amoral', 'arrogant', 'calculating', 'egocentric', 'hedonistic', 'malicious', 'opportunistic'],
        r: [ 'authenticity', 'adventure', 'beauty', 'boldness', 'friendship', 'fun', 'humor', 'loyalty', 'candor', 'courage', 'creation', 'drive', 'empathy', 'enthusiasm', 'ferocity', 'independence', 'individuality', 'irreverence', 'joy', 'originality', 'passion', 'purpose', 'sensitive', 'spontaneous', 'trusting', 'dramatic', 'flexible', 'forthright', 'casual', 'stubborn', 'angry', 'blunt', 'careless', 'reckless', 'destructive', 'fickle', 'flamboyant', 'impulsive', 'performative', 'poetic'],
        g: [ 'growth', 'harmony', 'respect', 'spirituality', 'stability', 'acceptance', 'calm', 'centered', 'cautious', 'common sense', 'contentment', 'experienced', 'humility', 'intuition', 'maturity', 'meaning', 'moderation', 'restraint', 'reverence', 'serenity', 'sharing', 'significance', 'simplicity', 'strength', 'vigor', 'agreeable', 'contemplative', 'hearty', 'barbaric', 'virile', 'well-adapted', 'conservative', 'traditional', 'eldritch', 'ancient'],
    }
    static big5 = {
        w: new Big5(-2,2,0,1,-1),
        u: new Big5(2,1,0,0,-1),
        b: new Big5(1,-2,1,0,0),
        r: new Big5(2,-2,1,1,0),
        g: new Big5(-2,1,1,2,-1),
    }
    getCommonName(str){
        // lower(str)
        
        const reverseString = (str) =>{
            return str.split('').reverse().join('');  
        }
        
        if(str === 'wu' || str === reverseString('wu')){
            return 'azorius'
        }
        if(str === 'ub'|| str === reverseString('ub')){
            return 'dimir'
        }
        if(str === 'br'|| str === reverseString('br')){
            return 'rakdos'
        }
        if(str === 'rg'|| str === reverseString('rg')){
            return 'gruul'
        }
        if(str === 'wb'|| str === reverseString('wb')){
            return 'orzhov'
        }
        if(str === 'ur'|| str === reverseString('ur')){
            return 'izzet'
        }
        if(str === 'bg'|| str === reverseString('bg')){
            return 'golgari'
        }
        if(str === 'rw'|| str === reverseString('rw')){
            return 'boros'
        }
        if(str === 'gu'|| str === reverseString('gu')){
            return 'simic'
        }
    }
}

// peasant, bandit, innkeeper, fighter, ranger, rogue
class characterClass{
    constructor(id, stats, skills){
        this.id = id;
        this.stats = stats;
        this.skills = skills;
    }
    static characterClasses = ['peasant', 'farmer', 'bandit', 'innkeeper', 'fighter', 'ranger', 'rogue'];
}

class Npc{
    constructor(id, desc, characterClass, mood){
        this.id = id;
        this.desc = desc;
        this.characterClass = characterClass;
        this.mood = mood;
    }
}

/*
const months = ["January", "February", "March", "April", "May", "June", "July"];

const random = Math.floor(Math.random() * months.length);
console.log(random, months[random]);
*/

class World{
    static locations = ['Valeria', 'Grand Mountains', 'The Old Lands', 'Mundania', 'Novellia', 'Estia', 'Westia', 'Eldia', 'Erebon', 'Emerald Isles']
}

class Character{
    // id, name, race, characterClass
    constructor(id, gender, name, birthPlace, race, stats, characterClass, background){
        if (id == null || id === ''){
            this.id = getUuidv4;
        } else {
            this.id = id;
        }
        
        this.gender = gender;
        this.name = name;
        this.birthPlace = birthPlace;
        this.race = race;
        this.characterClass = characterClass;
        this.stats = stats;
        this.background = background;
    }

    
    static genders = ['male', 'female'];
    static names = {
        male:['Bob', 'Jerry', 'Emile', 'Will', 'Marcus', 'Aran'],
        female:['Belle', 'Jane', 'Emily', 'Willa', 'Maria', 'Aria']
    }
    static names = {
        human:{
            male:[],
            female:[],
        },
        dwarf:{

        },
        elf:{
            
        }
    }

    static races = ['human'];
    static classes = ['peasant', 'bandit', 'innkeeper', 'fighter', 'ranger', 'rogue'];
    static backgrounds = ['noble', 'street urchin', 'foreigner', 'veteran', 'scholar']
    static generateCharacter(){
        const id = getUuidv4();
        console.log(`${Character.genders}`)
        const gender = getRandomFromArray(Character.genders);
        console.log(`${gender}`);
        console.log(`${Character.names[gender]}`);
        const name = getRandomFromArray(Character.names[gender]);
        const race = getRandomFromArray(Character.races);
        const birthPlace = getRandomFromArray(World.locations);
        const characterClass = getRandomFromArray(Character.classes);
        const stats = Stats.getStats();
        const background = getRandomFromArray(Character.backgrounds);
        switch (background){
            case 'noble':
                stats.heart += 1;
                break;
            case 'street urchin':
                stats.shadow += 1;
                break;
            case 'foreigner':
                stats.edge += 1;
                break;
            case 'veteran':
                stats.iron += 1;
                break;
            case 'scholar':
                stats.wit += 1;
                break;
        }
        return new Character(id, gender, name, birthPlace, race, stats, characterClass, background)
    }
    showTitle(){
        return `${this.name} the ${this.race} ${this.characterClass} was a ${this.background} from ${this.birthPlace}`;
    }
    getStats(){
        
        for (let [key, value] of Object.entries(this.stats)) {
            console.log(`${key}: ${value}`);
        }
        return this.stats
    }
}


const inn = new Room('inn', 'You are inn a quaint, cozy inn', ['city', 'bed'] );
const city = new Room('city', ['inn', 'gate']);

let char1 = new Character()

char1 = Character.generateCharacter();
char1.getStats();

// HTML
const div = $.createElement('div');
$.body.appendChild(div);

const btn = $.createElement('button');
btn.textContent = 'CREATE CHARACTER';
btn.addEventListener('click', () => {
    const c = Character.generateCharacter();
    const div2 = $.createElement('div');
    console.log(`[button] ${c.showTitle()}`)
    div2.innerHTML = `
        <h3>${c.showTitle()}</h3>
        <div>heart: ${c.stats.heart}</div>
        <div>wit: ${c.stats.wit}</div>
        <div>edge: ${c.stats.edge}</div>
        <div>iron: ${c.stats.iron}</div>
        <div>shadow: ${c.stats.shadow}</div>
    `;
    div.appendChild(div2);
});
div.appendChild(btn);