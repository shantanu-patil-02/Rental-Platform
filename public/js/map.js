
    maptilersdk.config.apiKey = mapToken;
    const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: [75.5626, 21.0077], // starting position [lng, lat]
    zoom: 14 // starting zoom
});


const address = document.getElementById('addressInput').value;