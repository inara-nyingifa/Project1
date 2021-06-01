// variables
var city="";

var destination = document.querySelector("#destination");
var SearchBtn = document.querySelector("#search-btn");
var placesContainer = document.querySelector("#places-container");
var mainPage = document.getElementById("main-page");


// create a variable with the latitude and longitud
var mylatlng = { lat: -33.866, lng: 151.196 }
var mapOptions = {
    center: mylatlng,
    zoom: 15,
    mapId: "8d193001f940fde3",
};

//create new containers
function createMap() {
    document.getElementById("main-box").style.display = "none";
    var mapDiv = document.createElement("div");
    mapDiv.setAttribute("id", "map");
    mainPage.appendChild(mapDiv);
    map = new google.maps.map(document.getElementById('map'), mapOptions)
}

 


















// get input text
destination.addEventListener('place_changed', onPlaceChanged);

function onPlaceChanged() {
   var place = destination.getPlace(); 
   if (!place.geometry) {
       // user did not select a destination, reset the input field
       document.getElementById('destination').placeholder =
       'Where are you going?'
   } else {
       // Display details about the valid place
       document.getElementById('details').innerHTML = place.name;
   }
}

$("#search-btn").on("click", createMap);