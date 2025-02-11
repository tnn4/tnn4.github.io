// var global
// let scoped

const oracleActions = ["scheme", "clash", "weaken", "initiate"]

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

function getOracleAction(num) {
    if (num >= 1 && num <= 25){
        console.log('case 1');
        return oracleActions[0];
    } else if (num >= 26 && num <= 50 ){
        console.log('case 2');
        return oracleActions[1];
    } else if (num >= 51 && num <= 75 ){
        console.log('case 3');
        return oracleActions[2];
    } else if (num >= 76 && num <= 100 ){
        console.log('case 4');
        return oracleActions[3];
    } else {
        console.log('case default');
        return oracleActions[0];
    }
}  

function draw() {
    let drawnNumber = rng.draw();
    
    let htmlNumber = document.getElementById("numberDrawn");
    const num = document.createElement('p');
    num.textContent = drawnNumber;
    htmlNumber.appendChild(num);
    
    let oracleActionDiv = document.getElementById("oracleAction");
    const oActDiv = document.createElement('p');
    console.log('Drawn number = ' + drawnNumber);
    let selectedAction = getOracleAction(drawnNumber);
    console.log(selectedAction);
    oActDiv.textContent = selectedAction;
    oracleActionDiv.appendChild(oActDiv);
}

  // Usage example:
  const rng = new UniqueRNG(1, 100);
  try {
    console.log(drawnNumber); // Draws a unique number between 1 and 100
  } catch (error) {
    console.error(error.message);
  }