var aerialLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-GP, and the GIS User Community'
});

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13,
    layers: [osmLayer] 
});

var baseMaps = {
    "Standard Map": osmLayer,
    "Aerial Imagery": aerialLayer
};

L.control.layers(baseMaps).addTo(map);

const santaIcon = L.icon({
    iconUrl: 'santaicon.png',
    iconSize: [80, 80],
    iconAnchor: [20, 40],
    popupAnchor: [0, -37]
});


const marketLocations = [
  {
    id: 1,
    name: "Southbank Centre Winter Market",
    lat: 51.5057,
    lng: -0.1168,
    address: "Belvedere Rd, London SE1 8XX",
    images: "assets/images/southBank1.jpg"
  },
  {
    id: 2,
    name: "Hyde Park Winter Wonderland",
    lat: 51.5073,
    lng: -0.1657,
    address: "Hyde Park, London W2 2UH",
    images: "assets/images/hydePark2.jpg"
  },
  {
    id: 3,
    name: "Leicester Square Christmas Market",
    lat: 51.5104,
    lng: -0.1301,
    address: "Leicester Square, London WC2H 7LU",
    images: "assets/images/leicesterSq3.jpg"
  },
  {
    id: 4,
    name: "Greenwich Christmas Market",
    lat: 51.4816,
    lng: -0.0091,
    address: "5B Greenwich Market, London SE10 9HZ",
    images: "assets/images/greenwich4.jpg"
  },
  {
    id: 5,
    name: "Covent Garden Christmas Village",
    lat: 51.5117,
    lng: -0.1240,
    address: "41 The Market, London WC2E 8RF",
    images: "assets/images/coventGarden5.jpg"
  },
  {
    id: 6,
    name: "Borough Market at Christmas",
    lat: 51.5055,
    lng: -0.0913,
    address: "8 Southwark St, London SE1 1TL",
    images: "assets/images/borough6.jpg"
  },
  {
    id: 7,
    name: "Trafalgar Square Christmas Market",
    lat: 51.5080,
    lng: -0.1281,
    address: "Trafalgar Sq, London WC2N 5DN",
    images: "assets/images/trafalgar7.jpg"
  },
  {
    id: 8,
    name: "Clapham Common Winterville",
    lat: 51.4578,
    lng: -0.1494,
    address: "Windmill Dr, London SW4 9DE",
    images: "assets/images/clapham.jpg"
  },
  {
    id: 9,
    name: "Spitalfields Christmas Market",
    lat: 51.5196,
    lng: -0.0752,
    address: "65 Brushfield St, London E1 6AA",
    images: "assets/images/spitalfields9.jpg"
  },
  {
    id: 10,
    name: "Battersea Power Station Market",
    lat: 51.4821,
    lng: -0.1440,
    address: "Battersea Power Station, London SW11 8BZ",
    images: "assets/images/battersea.jpg"
  }
];

document.addEventListener('DOMContentLoaded', function() {
    // Get all table rows
    let marketRows = document.querySelectorAll('tr'); 

    // Loop through them (skipping the header row if necessary)
    marketRows.forEach(row => {
        row.addEventListener('click', function() {
            let marketId = this.id;
            // 1. Retrieve the specific marker from our lookup object
            let selectedMarker = markers[marketId];
            if (selectedMarker) {
                // 2. Move the map smoothly to the marker
                // 'flyTo' is better than 'setView' for orientation
                map.flyTo(selectedMarker.getLatLng(), 16, {
                    duration: 1.5
                });
                // 3. Open the popup (This is the "Focus")
                selectedMarker.openPopup();
                // 4. Scroll the page up to the map so the user sees it
                document.getElementById('map').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center' 
                });
            }
        });
    });
});

// Iterate through each market in your list
const markers = {};

marketLocations.forEach(function(market) {
    
    var marker = L.marker([market.lat, market.lng],{
        icon: santaIcon
    }).addTo(map);

    var popupContent = `
        <div style="text-align: center;">
            <h3 style="margin: 0 0 5px 0;">${market.name}</h3>
            <img src="${market.images}" alt="${market.name}" style="width: 100%; height: auto; max-width: 300px; margin-bottom: 5px;"/>
            <p style="margin: 0; font-size: 0.9em;">${market.address}</p>
        </div>
    `;

    marker.bindPopup(popupContent);

    markers[market.id] = marker;
});
