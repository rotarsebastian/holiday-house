import { endpoint } from './auth';

const properitesEndpoint = endpoint + '/properties';

const auth = {
    isAuthenticated: false,
    email: undefined,
    userID: undefined
}

export const getOneProperty = async(id) => {
    try {
        const options = {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(properitesEndpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getRecommendedProperties = async(id) => {

    const userLogged = id ? `?id=${id}` : '';

    try {
        const options = {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(properitesEndpoint + '/random/10' + userLogged, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getUserProperties = async(id, offset) => {
    try {
        const options = {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(properitesEndpoint + '/user/' + id + `?offset=${offset}`, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getProperties = async(from, to, guests, city, offset, minprice, maxprice, types, user_id) => {
    let requestString = `?from=${from}&to=${to}&guests=${guests}&city=${city}&offset=${offset}`;

    if( minprice && maxprice ) {
        requestString += `&minprice=${minprice}`;
        requestString += `&maxprice=${maxprice}`;
    }

    if( types ) types.map(type => requestString += `&${type}`);

    if( user_id ) requestString += `&user=${user_id}`;

    try {
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(properitesEndpoint + requestString, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const deleteProperty = async(id) => {
    try {
        const options = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(properitesEndpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const citySearch = async(city) => {
    try {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(properitesEndpoint + `/city/search?city=${city}`, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const createProperty = async(addPropertyData) => {
    try {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*/*',
            },
            body: addPropertyData
        };
        const response = await fetch(properitesEndpoint, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const editProperty = async(id, editPropertyData) => {
    try {
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Accept': '*/*',
            },
          body: editPropertyData
        };
        const response = await fetch(properitesEndpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export default auth;