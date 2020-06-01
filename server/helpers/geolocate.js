const { mapKey } = require(__dirname + '/../config/otherConfigs');
const fetch = require('node-fetch');

const geolocate = async(city) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapKey}&limit=1&lang=en`;
    
    try {
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, options);
        const data = await response.json();

        const { features: city } = data;
        if(city.length === 0) return { status: 0, message: 'Unable to find location. Try another search!' };
        else {
            return { status: 1, coordinates: city[0].center };
        }
    }
    catch(err) {
        return { status: 0, message: 'Unable to connect to location service!', err };
    }
};

module.exports = { 
    geolocate
}