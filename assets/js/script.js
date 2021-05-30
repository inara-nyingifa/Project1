// variables
var city="";

var destination = document.querySelector("#destination");
var SearchBtn = document.querySelector("#search-btn");
var placesContainer = document.querySelector("#places-container");


// API key
var APIKey = "AIzaSyD3hvG5xtniBYkSfMmW0gBSpISphcw5RUg";

// function to grab the city from the text input 
function displayPage(event){
    event.preventDefault();
    if(destination.val().trim()!==""){
        city=destination.val().trim();
        displayPlaces(city);
    }
}

// function to hide the first page and display the places 
function displayPlaces(city) {
document.getElementById("main-box").style.display = "none";

}


// Event listeners
$("#search-btn").on("click",displayPlaces);
