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

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

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
        console.log("Trying to fetch from: " + final_url);
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
                
                // img
                img = document.createElement('img');
                
                img.src = jsonElement.url;
                
                // Scale image
                img.width = jsonElement.width * scaleFactor;
                console.log("img.width = " + img.width);
                img.height = jsonElement.height * scaleFactor;
                console.log("img.src = " + img.src);
                //


                document.getElementById('pic').appendChild(img);
                // End img

                const art_credits_element = document.createElement('p');
                
                
                let artist_name = '';
                let art_credits_patreon = '';
                let art_credits_pixiv = '';
                let art_credits_twitter = '';
                let art_credits_deviantArt = '';
                
                const creditElements = document.getElementById('credits');

                if (jsonElement.artist != null){
                    if ( jsonElement.artist.name != null){
                        artist_name = jsonElement.artist.name;
                        const creditNameElement = document.getElementById('creditsName');
                        creditNameElement.innerHTML = 'Name: ' + artist_name + '<br>';
                    } 
                    if (jsonElement.artist.patreon != null){
                        art_credits_patreon += jsonElement.artist.patreon;
                        const creditArtistElement = document.getElementById('creditsPatreon');
                        creditArtistElement.innerHTML = 'Patreon: ' + '<a href=\"' + art_credits_patreon + `\">${art_credits_patreon}</a>` + '<br>'
                        
                    }
                    if (jsonElement.artist.pixiv != null){
                        art_credits_pixiv += jsonElement.artist.pixiv;
                        const creditPixivElement = document.getElementById('creditsPixiv');
                        creditPixivElement.innerHTML = 'Pixiv: ' + '<a href=\"' + art_credits_pixiv + `\">${art_credits_pixiv}</a>` + '<br>'
                    }
                    if (jsonElement.artist.twitter != null){
                        art_credits_twitter += jsonElement.artist.twitter;
                        const creditTwitterElement = document.getElementById('creditsTwitter');
                        creditTwitterElement.innerHTML = 'Twitter: ' + '<a href=\"' + art_credits_twitter + `\">${art_credits_twitter}</a>`+ '<br>'
                    }
                    if (jsonElement.artist.deviant_art != null){
                        art_credits_deviantArt += jsonElement.artist.deviant_art;
                        const creditDeviantartElement = document.getElementById('creditsDeviantart');
                        creditDeviantartElement.innerHTML = 'Deviant Art: ' + '<a href=\"' + art_credits_deviantArt + `\">${art_credits_deviantArt}</a>` +'<br>'
                    }

                    console.log('jsonElement.artist.patreon) = ' + jsonElement.artist.patreon);
                    console.log('jsonElement.artist.pixiv) = ' + jsonElement.artist.pixiv);
                    console.log('jsonElement.artist.twitter) = ' + jsonElement.artist.twitter);
                    console.log('jsonElement.artist.deviantArt) = ' + jsonElement.artist.deviant_art);
    
    
                    console.log('patreon = ' + art_credits_patreon);
                    console.log('pixiv = '+ art_credits_pixiv);
                    console.log('twitter = '+ art_credits_twitter);
                    console.log('deviant = '+ art_credits_deviantArt);
                }

                



            }
        }

        // const json_obj = JSON.parse(json);

        newParagraph = document.createElement("p")
        textNode = document.createTextNode("placeholder");
    } catch(error) {
        console.error(error.message);
    } 
}

