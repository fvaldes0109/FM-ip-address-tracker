var targetElements = [];
var input;

const init = () => {

    targetElements = document.querySelectorAll('.info-value');
    input = document.querySelector('input');
    input.addEventListener('keypress', (event) => {
        
        if (event.key == 'Enter') {
            event.preventDefault();
            document.querySelector('button').click();
        }
    })

    getGeolocation();
}

const getGeolocation = async (fromInput) => {


    var query = '';
    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_RPwwuRa3at32ZKgoegEmoWb4FBBQl`;

    var ip;

    if (fromInput) {
        if (input.value === '') return;
        query = input.value;
    }
    input.value = '';

    // Use regex to validate if 'query' is an ipv4 or ipv6
    if (query.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) || query.match(/^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/)) {
        url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_RPwwuRa3at32ZKgoegEmoWb4FBBQl&ipAddress=${query}`;
    }
    else url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_RPwwuRa3at32ZKgoegEmoWb4FBBQl&domain=${query}`;

    try {
        // throw new Error('Dummy error');

        var response = await fetch(url);
        var data = await response.json();

        ip = data.ip;

        targetElements[0].innerHTML = ip;
        targetElements[1].innerHTML = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`;
        targetElements[2].innerHTML = `UTC ${data.location.timezone}`;
        targetElements[3].innerHTML = data.isp;
        
        var lat = data.location.lat;
        var lng = data.location.lng;
    
        createMap(lat, lng);

    } catch (error) {

        console.log(error);
        
        // Default values
        ip = '192.212.174.101';
        targetElements[0].innerHTML = 'Error fetching data';
        targetElements[1].innerHTML = 'Error fetching data';
        targetElements[2].innerHTML = 'Error fetching data';
        targetElements[3].innerHTML = 'Error fetching data';

        createMap();
    }
}

const createMap = (lat = 43.5789, lng = -79.6583) => {

    var map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var blackIcon = L.icon({
        iconUrl: './images/icon-location.svg',

        iconSize:     [50, 60], // size of the icon
        iconAnchor:   [25, 60], // point of the icon which will correspond to marker's location
    });

    L.marker([lat, lng], { icon: blackIcon }).addTo(map);
}

window.addEventListener('load', init);