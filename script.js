
const map = L.map('map').setView([51.4821, -0.1440], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Battersea Power Station Market
L.marker([51.4821, -0.1440])
    .addTo(map)
    .bindPopup("Battersea Power Station Market")
    .openPopup();

