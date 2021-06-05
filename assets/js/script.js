// variables
var city = '';

function initAutocomplete() {
    const pyrmont = { lat: -33.866, lng: 151.196 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
      zoom: 15,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
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
          console.log("Returned place contains no geometry");
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

// Create the places service.
const service = new google.maps.places.PlacesService(map);
let getNextPage;
const moreButton = document.getElementById("more");

moreButton.onclick = function () {
  moreButton.disabled = true;

  if (getNextPage) {
    getNextPage();
  }
};
// Perform a nearby search.
service.nearbySearch(
  { location: pyrmont, radius: 500, type: "restaurant" },
  (results, status, pagination) => {
    if (status !== "OK" || !results) return;
    addPlaces(results, map);
    moreButton.disabled = !pagination || !pagination.hasNextPage;

    if (pagination && pagination.hasNextPage) {
      getNextPage = () => {
        // Note: nextPage will call the same handler function as the initial call
        pagination.nextPage();
      };
    }
  }
);
}

function addPlaces(places, map) {
const placesList = document.getElementById("places");

for (const place of places) {
  if (place.geometry && place.geometry.location) {
    const image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };
    new google.maps.Marker({
      map,
      icon: image,
      title: place.name,
      position: place.geometry.location,
    });
    const li = document.createElement("li");
    li.textContent = place.name;
    placesList.appendChild(li);
    li.addEventListener("click", () => {
      map.setCenter(place.geometry.location);
    });
  }
}
}

  