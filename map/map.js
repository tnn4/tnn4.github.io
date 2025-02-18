const $ = document;
const $gebi = document.getElementById;

const setupScene = ( () => {
    const sceneDiv = $.createElement('div');
    sceneDiv.id = 'scene-div';
    $.body.appendChild(sceneDiv);

    const currentRegionDiv = $.createElement('div');
    currentRegionDiv.id = 'current-region-div';
    $.body.appendChild(currentRegionDiv);


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


    class Region {
        constructor(id, name, description, connectsTo, resupplyScore){
            this.id = id;
            this.name = name;
            this.description = description;
            this.connectsTo = connectsTo;
            this.resupplyScore = resupplyScore;
        }
        getName() {
            return `${this.name}`;
        }
        describe() {
            return `${this.description}`;
        }
        getConnectedRegion() {
            return this.connectsTo;
        }
        addConnectedRegion(list){
            this.connectsTo = list;
        }
    }

    const barrierIslands = new Region(0, 'barrier islands', 'This long chain of bleak islands parallels \
the Ragged Coast. The islands are sparsely populated by \
Ironlanders, mostly fisher-folk who brave the surrounding \
waters. ', ['ragged coast'],2);
    const raggedCoast = new Region(1, 'ragged coast', ' This is a rugged land of snow-capped cliffs \
overlooking blue waters. Ironlander settlements arelocated at \
the head of the fjords in the shelter of narrow valleys. ', ['barrier islands', 'deep wilds', 'hinter lands','tempest hills'],3);
    const deepWilds = new Region(2, 'deep wilds', ' This vast swath of ancient forest is largely \
uninhabited andunexplored by Ironlanders. Most avoid this \
region. ', ['ragged Coast', 'havens', 'hinterlands'],2);
    const floodLands = new Region(3, 'flooded lands', 'This is a low-lying region of bogs, swamps, \
lakes, and slow-moving rivers. A few hardy Ironlanders live \
here in small settlements built atop hillocks, or in homes \
standing on stilts over the wetlands. ', ['barrier islands', 'havens'],2);
    const havens = new Region(4, 'haven', 'This is an expansive area of forests, rivers, \
shrubland, and low hills. It is a relative oasis in the harsh \
Ironlands, but even here there is little comfort or safety.', ['raggedCoast', 'flooded lands', 'hinterlands'],4);
    const hinterlands = new Region(5, 'hinterlands', 'This imposing terrain consists of dense forests \
nestled against rugged hills. The Ironlander settlements in this \
region serve primarily as bases for hunters and trappers.', ['deep wilds', 'havens', 'tempest hills'],2);
    const tempestHills = new Region(6, 'tempest hills' ,' These highlands are defined by rugged \
hills, low mountains, thin woods, and grassy plateaus. \
Ironlanders live here in nomadic camps or mining settlements. ', ['hinter lands', 'veiled mountains'],1);
    const veiledMountains = new Region(7, 'veiled mountains', 'These great peaks mark the northern \
bounds of the settled lands. A few hardy Ironlanders dwell \
here in small mining communities. Most of them head south \
before the long, brutal winter takes hold. ', ['tempest hills', 'shattered wastes'], 1);
    const shatteredWastes = new Region(8, 'shattered wastes',' This plain of jagged, broken ice is \
uninhabited by Ironlanders. No one knows the bounds of this \
land or what lies beyond. ', ['veiled mountains'],0.5);
    
        const regionDictionary = {
            BI:barrierIslands,
            RC:raggedCoast,
            DW:deepWilds,
            FL:floodLands,
            HV:havens,
            HL:hinterlands,
            TH:tempestHills,
            SW:shatteredWastes
        }

const iSRegions = [
        barrierIslands,
        raggedCoast,
        deepWilds,
        floodLands,
        havens,
        hinterlands,
        tempestHills,
        veiledMountains,
        shatteredWastes,
]
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
        for(let i=1; i< location.length; i++){
            adjacentLocations.push(location[i]);
        }
        console.log(`${adjacentLocations}`);
        const locationDiv = $.createElement('div');
        locationDiv.innerHTML = `<p>Current ${ironswornLocations[currentLocation]} </p>`;
        let adjLocation;
        adjacentLocations.forEach( (i) => {
            
            const div = $.createElement('div');
            div.innerHTML = `${ironswornLocations[i]}`;
            locationDiv.appendChild(div);


        })
        sceneDiv.appendChild(locationDiv);
    });

    let currentRegion = '';
    let supplies = 10;
    let currentYear = 100;
    let currentDay = 10;
    let currentMonth = 1;
    // parent div = sceneDiv
    const showISRegions = (() => {
        iSRegions.forEach( (r) => {
            const div = $.createElement('div');
            div.innerHTML = `Region: ${r.name}<br> Description: ${r.description}<br> Connects to: ${r.connectsTo} `;
            r.connectsTo.forEach((r2) => {
                const goToBtn = $.createElement('button');
                goToBtn.textContent = r2;
                goToBtn.addEventListener('click', () => {
                    console.log(`Clicked go to: ${r2}`);
                    currentRegion = r2;
                    console.log(`[IS]Current region: ${r2}`);
                    currentRegionDiv.innerHTML = `<h2>Current Region: ${r2}</h2>`;
                    console.log(`Supplies left: ${supplies}`);
                    supplies--;
                    if (supplies === 0 ){
                        console.log('GAME OVER: Out of food');
                        currentRegionDiv.innerHTML = `<h2>Current Region: WOrld of the Dead</h2>`;
                        // sceneDiv.innerHTML = 'GAME OVER';
                        
                        const restartBtn = $.createElement('button');
                        restartBtn.textContent = 'New World';
                        restartBtn.addEventListener('click', setupScene);
                        sceneDiv.appendChild(restartBtn);
                    }
                })
                div.appendChild(goToBtn);
            })
            sceneDiv.appendChild(div);
        })
    })();

    const createResupplyBtn = () => {
        const resupplyBtn = $.createElement('button');
        resupplyBtn.textContent = 'resupply here';
        $.body.appendChild(resupplyBtn);
        resupplyBtn.addEventListener('click', ()=> {
            let supplyScore = 0;
            for(i=0; i < iSRegions.length; i++){
                console.log(`current region = ${currentRegion} iSRegions[i] = ${iSRegions[i].name}`);
                if(currentRegion === iSRegions[i].name) {
                    console.log(`supplies before add: ${supplies}`);
                    console.log(`resupply score = ${iSRegions[i].resupplyScore}`);
                    supplies += iSRegions[i].resupplyScore;
                    console.log(`supplies: ${supplies}`);
                    break;
                }
            }
            
        });
    }
    createResupplyBtn();

})();