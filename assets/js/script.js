let map;
let localContextMapView;
const styles = [
    { elementType: "geometry", stylers: [{ color: "#efe6be" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#f5f5f5" }, { weight: 1.5 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#9e9e9e" }, { weight: 1.5 }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#c44135" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#328829" }],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "geometry",
      stylers: [{ color: "#2ca37b" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#e4b083" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#32cbb1" }],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ];

function initMap() {
  localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "cafe", weight: 2 },
      { type: "department_store", weight: 1 },
      { type: "bar", weight: 2 },
      { type: "park", weight: 3 },
      { type: "restaurant", weight: 3 },
      { type: "supermarket", weight: 2 },
    ],
    maxPlaceCount: 10,
  });
  map = localContextMapView.map;
  map.setOptions({
    center: { lat: 34.052235, lng: -118.243683 },
    zoom: 14,
    styles,
  });
  // Build and add the Autocomplete search bar
  const input = document.getElementById("input");
  const options = {
    types: ["address"],
    componentRestrictions: {
      country: "us",
    },
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setFields(["address_components", "geometry", "name"]);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place || !place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      swal("No address available for that input.");
      return;
    }
    // Recenter the map to the selected address
    map.setOptions({
      center: place.geometry.location,
      zoom: 14,
    });
    // Update the localContext directionsOptions origin
    localContextMapView.directionsOptions = {
      origin: place.geometry.location,
    };
    new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR4AWMYOWAU/AfhYWMBCxA3A/FlIN4MxN7I6gjg80DcD8QC+CzIxqIxH6aOSHwfYQmmBZexuQymjgTcj8uCz1gUHybDgvO4LFiMRXE4GRb8x2UBDxCXQ8PxPdSrLNSxAD+g3ALCeNQCKoHhZcHAg1EAAM3cyWj3TGxhAAAAAElFTkSuQmCC",
      zIndex: 30,
    });
    // update the results with new places
    localContextMapView.search();
  });
}


//adding local storage



    