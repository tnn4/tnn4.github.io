// var globals
// let scoped

var scaleFactor = 0.25;
var included_tags = ["waifu"];

var dropdown;
var var1;
var url1;

window.onload = main();

function main() {
    dropdown = document.getElementById("dropdownMenuForTag");
    console.log('dropdown object = ' + dropdown );

    var1 = document.getElementById("pic");
    console.log('pic = ' + var1 );
}



dropdown.addEventListener("change", function(){
    console.log('dropdown.value = ' + dropdown.value);
    if(included_tags.length === 0){
        included_tags.push("waifu");
    } else { 
        let index = included_tags.indexOf(dropdown.value);
        console.log("index = " + index);
        // add only if it does not exist yet
        if (index === -1 ) included_tags.splice(0, 1, dropdown.value);
    }
});


function getIncludedTags(){
    console.log('included_tags = ' + included_tags);
}

function clearElementById(id) {
    console.log('Clearing from element: ' + id);
    document.getElementById(id).innerHTML = "";
}

async function getRandomWaifu() {
    const url = "https://zenquotes.io/api/quotes";
    // see: https://docs.waifu.im/quick-start
    // Here is an example to get a random image with  maid tags:
    // Set up a url builder for this
    const url_waifuim = "https://api.waifu.im/search";
    let url_included_tags = "?included_tags=" + included_tags[0];
    let final_url = url_waifuim + url_included_tags;
    var newParagraph;
    var textNode;
    var img;
    try {
        const response = await fetch(final_url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("json = " + json);
        console.log("json.images = " + json.images);
        
        // Reset div (clear so we can replace with another image to not clog the screen)
        document.getElementById('pic').innerHTML = "";

        if (Array.isArray(json.images)){
            console.log("json.images.length = " + json.images.length);
            for (var i=0; i < json.images.length; i++){
                var jsonElement = json.images[i];
                console.log(jsonElement);
                img = document.createElement('img');
                
                img.src = jsonElement.url;
                
                // Scale image
                img.width = jsonElement.width * scaleFactor;
                console.log("img.width = " + img.width);
                img.height = jsonElement.height * scaleFactor;
                console.log("img.src = " + img.src);
                //


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

