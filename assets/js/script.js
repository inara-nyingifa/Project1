// variables
var city="";

var destination = document.querySelector("#destination");
var SearchBtn = document.querySelector("#search-btn");
var placesContainer = document.querySelector("#places-container");

// Set map options

// create a variable with the latitude and longitud
var mylatlng = { lat: -33.866, lng: 151.196 }
var mapOptions = {
    center: mylatlng,
    zoom: 15,
    mapId: "8d193001f940fde3",
};


// API key
var APIKey = "AIzaSyD3hvG5xtniBYkSfMmW0gBSpISphcw5RUg";


// function to hide the first page and display the places 
function displayPlaces(city) {
document.getElementById("main-box").style.display = "none";
var mapDiv = document.createElement("div");
mapDiv.setAttribute('id','googleMap');
// create map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)
}


// create the place filter service






// function to grab the city from the text input 
function displayPage(event){
    event.preventDefault();
    if(destination.val().trim()!=="")
        city=destination.val().trim();
        displayPlaces(city);
    }



// Event listeners
$("#search-btn").on("click",displayPlaces);
