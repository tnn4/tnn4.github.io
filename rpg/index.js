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

const getNColors = (n) => {
    let ls = [];
    chooser = getRandomNoRepeats(colors);
    for(let i=0; i<n; i++){
        ls.push(chooser());
    }

    return ls;
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