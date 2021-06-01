// variables
var city="";

var destination = document.querySelector("#destination");
var SearchBtn = document.querySelector("#search-btn");
var placesContainer = document.querySelector("#places-container");
var mainPage = document.getElementById("main-page");


// create a variable with the latitude and longitud
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
};

function displayMap() {
document.getElementById("main-box").style.display = "none";
var mapDiv = document.createElement("div");
mapDiv.setAttribute("id", "map");
mainPage.appendChild(mapDiv);
initMap();
}

 


$("#search-btn").on("click", displayMap);