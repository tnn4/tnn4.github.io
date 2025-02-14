function getRandomElement(array){
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
}

// see: https://xkcd.com/json.html
async function setupXkcd() {
    const _body = document.body;
    const xkcdDiv = document.createElement('div');
    _body.appendChild(xkcdDiv);
    
    const listAll = document.createElement('div');
    listAll.innerHTML = '<a href=https://www.explainxkcd.com/wiki/index.php/List_of_all_comics>List of all xkcd comics</a>'
    xkcdDiv.appendChild(listAll);

    const xkcd_base_url='https://xkcd.com/';
    const xkcd_latest_url='https://xkcd.com/info.0.json';
    const xkcd_base_comics_url='https://imgs.xkcd.com/comics';
    // const xkcdDiv = document.getElementById('xkcd');
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
        // "scientists",
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
        console.log('Selected comic = ' + selectedComic);
        let final_comic_url = xkcd_base_comics_url + '/' + selectedComic + '.png';
        xkcdImg.src = final_comic_url;
        xkcdImgInfo.innerHTML = `<h2>xkcd: ${selectedComic}</h2><br>`;
        xkcdDiv.appendChild(xkcdImgInfo);
        xkcdDiv.appendChild(xkcdImg);
    }
    const br = document.createElement('br');
    xkcdDiv.appendChild(br);
    xkcdDiv.appendChild(br);
    xkcdDiv.appendChild(xkcdSearch);
}

function main() {
    setupXkcd();
}

window.onload = main();

