let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.

function createMap(bikedata){
  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


  // Create a baseMaps object to hold the lightmap layer.
let baseMaps = {"street map":streetmap};


  // Create an overlayMaps object to hold the bikeStations layer.

let overlayMaps = {"bike stations":bikedata};

  // Create the map object with options.
let myMap = L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel,
  layers: [streetmap, bikedata]
});

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

};
// Create the createMarkers function.
function createMarkers(response){

  // Pull the "stations" property from response.data.
  let stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  let bikeMarkersArray = [];
  // Loop through the stations array.

  for(let x=0; x<stations.length; x++){
    let station = stations[x]

    // For each station, create a marker, and bind a popup with the station's name.
    let bikemark = L.marker([station.lat, station.lon]).bindPopup("<h2>"+station.name+"</h2>");
    // Add the marker to the bikeMarkers array.
    bikeMarkersArray.push(bikemark);
  };

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkersArray));

};

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);



//bonus
/*
let layers = {  Coming_Soon:L.layerGroup(),
                Empty_Stations:L.layerGroup(),
                Out_of_Order:L.layerGroup(),
                Low_Stations:L.layerGroup(),
                Healthy_Stations:L.layerGroup()};

                let myMap2 = L.map(map-id ,{
                  center:newYorkCoords,
                  zoom:mapZoomLevel,
                  layers:[layers.Coming_Soon, layers.Empty_Stations, layers.Out_of_Order, layers.Low_Stations, layers.Healthy_Stations] 
                });

let overlay = {Coming_Soon:layers.Coming_Soon,
  Empty_Stations:layers.Empty_Stations,,
  Out_of_Order:layers.Out_of_Order,
  Low_Stations:layers.Low_Stations,
  Healthy_Stations:layers.Healthy_Stations
};
  
L.control.layers(, overlay);
*/