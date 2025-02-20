const $ = document;



function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function typeWrite(txt, page) {
    console.log(`text to type out: ${txt}`)
    console.log(`text length = ${txt.length}`)
    var i = 0;
    var speed = 15; /* The speed/duration of the effect in milliseconds */
    while(i < txt.length){
        document.getElementById(`page-${page}`).innerHTML += txt.charAt(i);
        i++;
        await delay(speed);
    }
    if (i < txt.length) {

    // setTimeout(typeWrite, speed);
  }
}

const setUpStory = (() => {
    console.log('Settiing up story');
    let currIndex = 0;
    const story = [
        "CHAPTER 1: A TALE OF ADVENTURE",
        "Once upon a time...",
        "There lived a boy on a farm",
        "He always thought he was going to be a sheperd for the rest of his life",
        "But Fate had other plans",
        "Suffice to say, the boy's time as a sheep herder would soon draw to an end",
        "But before that happens, let him enjoy his peaceful time with his farm and father for a bit longer",
        "For his father will not be with him for much longer...",
        "I may need to add that Fate's plans for this boy may involve a bit of tragedy here and there",
        "You know how Fate is, she can be a bitch, sometimes",
        "Anyways, the boy goes on a grand and adventure along the way.",
        "He meets a few friends, some of them a bit sketchy (one of them might be a goblin)",
        "He gets some skills in swordsmanship and murders a few dark lords.",
        "One of the dark lord teaches him a valuable lesson",
        "\"Hero, I think you're gay.\"",
        "\"What? That can't be.\" He hesitates for a moment and kills the Dark Lord with a stab to the throat.",
        "Later that night he looks at the guys in his camp sleeping.",
        "He looks at a handsome one that's also a rogue and something rises in his heart and pants",
        "Yeah, he's gay. Oh shoot. How's he going to tell his dad about this.",
        "His dad's always been a manly man. He needs to figure out an optimal way to exit the closet",
        "He asks his friends for advice",
        "\"Alright, if he accepts you. Give him a hug\"",
        "\"If he doesn't?\"",
        "\"Kill that hateful man\"",
        "\"NO!! That's awaful\" the hero cries",
        "\"Suit yourself. You asked for advice, we're giving it.\"",
        "He goes home and tells his father about his condition",
        "His father rejects him and tells him to never come home",
        "His companions kill his father for him",
        "\"SURPRISE WE KILLED YOUR DAD!\"\"WHY?\" he cried, \"he may have be a jerk but that didn't mean I wanted to kill him. I'll kill you all!\" Not the reaction they were expecting.",
        "Oh shit, getting the last hit on the Dark Lords and the XP have hime stronger than all of us combined they thought. RUN.",
        "END OF CHAPTER 1",
    ];

    const titleDiv = $.createElement('div');
    titleDiv.innerHTML = '<h1>A story</h1>';
    $.body.appendChild(titleDiv);

    const instructions = $.createElement('div');
    instructions.innerHTML = '<h4><<: CLEAR / >>: ALL TEXT <br> <: back / >: forward</h4>';
    $.body.appendChild(instructions);

    const storyDiv = $.createElement('div');
    storyDiv.id = 'story-div';
    $.body.appendChild(storyDiv);
    




    const startBtn = $.createElement('button');
    startBtn.textContent = '<<';
    startBtn.addEventListener('click', () => {
        currIndex = 0;
        storyPartDiv.innerHTML = `${story[currIndex]}`;
        
    });

    const finishBtn = $.createElement('button');
    finishBtn.textContent = '>>';
    finishBtn.addEventListener('click', () => {
        currIndex = 0;
        let storyString = '';
        for (let i=0; i<story.length; i++){
            storyString += story[i] + '<br>';
        }
        storyPartDiv.innerHTML = `${storyString}`;
        
    });

    const backBtn = $.createElement('button');
    backBtn.textContent = '<';
    backBtn.addEventListener('click', () => {
        if (currIndex !== 0 ){
            
            const childElement = document.getElementById(`page-${currIndex}`);
            if (childElement) {
                childElement.remove();
            }
            
            currIndex--;
        }

        // storyPartDiv.innerHTML = `${story[currIndex]}`;
    });
    const forwardBtn = $.createElement('button');
    forwardBtn.textContent = '>';
    forwardBtn.addEventListener('click', () => {

        const part = $.createElement('p');
        part.id = `page-${currIndex}`;
        // part.textContent = `${story[currIndex]}`;
        
        storyPartDiv.appendChild(part);
        typeWrite(story[currIndex], currIndex);
        // storyPartDiv.innerHTML = `${story[currIndex]}`;
        if (currIndex < story.length)
            currIndex++
        
    });

    const backBtn2 = $.createElement('button');
    backBtn2.textContent = '<';
    backBtn2.addEventListener('click', () => {
        if (currIndex !== 0 ){
            
            const childElement = document.getElementById(`page-${currIndex}`);
            if (childElement) {
                childElement.remove();
            }
            
            currIndex--;
        }

        // storyPartDiv.innerHTML = `${story[currIndex]}`;
    });
    const forwardBtn2 = $.createElement('button');
    forwardBtn2.textContent = '>';
    forwardBtn2.addEventListener('click', () => {

        const part = $.createElement('p');
        part.id = `page-${currIndex}`;
        // part.textContent = `${story[currIndex]}`;
        
        storyPartDiv.appendChild(part);
        typeWrite(story[currIndex], currIndex);
        // storyPartDiv.innerHTML = `${story[currIndex]}`;
        if (currIndex < story.length)
            currIndex++
    });
    storyDiv.appendChild(backBtn2);
    storyDiv.appendChild(forwardBtn2);

    const storyPartDiv = $.createElement('div');
    storyDiv.id = 'part-div';
    storyDiv.appendChild(storyPartDiv);

    titleDiv.appendChild(backBtn);
    titleDiv.appendChild(forwardBtn);
    titleDiv.appendChild(startBtn);
    titleDiv.appendChild(finishBtn);


    storyDiv.appendChild(backBtn);
    storyDiv.appendChild(forwardBtn);

})();

// START main
window.onload = main();

function main() {
}
// END main