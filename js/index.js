var targetElements = [];

const init = () => {

    targetElements = document.querySelectorAll('.info-value');

    getGeolocation();
}

const getGeolocation = async (query = '') => {

    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_RPwwuRa3at32ZKgoegEmoWb4FBBQl`;

    // Default values
    var ip = '192.212.174.101';
    targetElements[0].innerHTML = '192.212.174.101';
    targetElements[1].innerHTML = 'Brooklyn, NY 10001';
    targetElements[2].innerHTML = 'UTC -05;00';
    targetElements[3].innerHTML = 'SpaceX Starlink';

    try {        
        var response = await fetch(url);
        var data = await response.json();

        ip = data.ip;

        targetElements[0].innerHTML = ip;
        targetElements[1].innerHTML = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`;
        targetElements[2].innerHTML = `UTC ${data.location.timezone}`;
        targetElements[3].innerHTML = data.isp;
        
    } catch (error) {
        console.log(error);
    }
    
}

window.addEventListener('load', init);