import ak from '../assets/configFile';

export const geolocate = async(address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ak('map')}&limit=5&lang=en`;
    
    try {
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, options);
        const data = await response.json();

        const { features } = data;
        if(features.length === 0) return { status: 0, message: 'Unable to find location. Try another search!' };
        else {
            return { status: 1, features };
        }
    }
    catch(err) {
        return { status: 0, message: 'Unable to connect to location service!', err };
    }
};
