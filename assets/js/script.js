// variables
var city = '';
var destination = document.querySelector('#destination');
var searchBtn = document.querySelector('#search-btn');
var placesContainer = document.querySelector('#places-container');
var mainPage = document.getElementById('main-page');
// create a variable with the latitude and longitude
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 34.052235, lng: -118.243683 },
    zoom: 15,
  });
  const searchBox = new google.maps.places.SearchBox(destination);
  console.log('searchBox', searchBox);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination);
  map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();
    console.log('places', places);
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry');
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
function displayMap() {
  document.getElementById('main-box').style.display = 'none';
  var mapDiv = document.createElement('div');
  mapDiv.setAttribute('id', 'map');
  mainPage.appendChild(mapDiv);
  initMap();
}
$('#search-btn').on('click', displayMap);