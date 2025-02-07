// var globals
// let scoped
async function getRandomQuote() {
    const url = "https://zenquotes.io/api/quotes";
    // see: https://docs.waifu.im/quick-start
    // Here is an example to get a random image with  maid tags:
    const url_waifuim = "https://api.waifu.im/search?included_tags=maid";
    var newParagraph;
    var textNode;
    var img;
    try {
        const response = await fetch(url_waifuim);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("json = " + json);
        console.log("json.images = " + json.images);
        // Reset div 
        document.getElementById('pic').innerhtml = "";

        if (Array.isArray(json.images)){
            console.log("json.images.length = " + json.images.length);
            for (var i=0; i < json.images.length; i++){
                var jsonElement = json.images[i];
                console.log(jsonElement);
                img = document.createElement('img');
                img.src = jsonElement.url;
                console.log("img.src = " + img.src);
                document.getElementById('pic').appendChild(img);
            }
        }

        // const json_obj = JSON.parse(json);

        newParagraph = document.createElement("p")
        textNode = document.createTextNode("placeholder");
    } catch(error) {
        console.error(error.message);
    } 
}