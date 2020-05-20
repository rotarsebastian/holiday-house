const endpoint = 'http://localhost:5555/api/properties';

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
          },
          body: JSON.stringify({})
        };
        const response = await fetch(endpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getUserProperties = async(id) => {
    try {
        const options = {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        };
        const response = await fetch(endpoint + '/user/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getProperties = async(from, to, guests, minprice, maxprice, type, city, offset) => {
    let requestString = `from=${from}&to=${to}&guests=${guests}&city=${city}&offset=${offset}`;
    if( minprice && maxprice ) {
        requestString = requestString + `&minprice=${minprice}`;
        requestString = requestString + `&maxprice=${maxprice}`;
    }
    if( type ) requestString = requestString + `&type=${type}`;
    
    try {
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        };
        const response = await fetch(endpoint + '?' + requestString, options);
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
          },
          body: JSON.stringify({})
        };
        const response = await fetch(endpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const createProperty = async(data, image) => {
    let images = [];
    images.push(image);
    try {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data, image})
        };
        const response = await fetch(endpoint + '/', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const editProperty = async(id, data, images) => {
    try {
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data, images})
        };
        const response = await fetch(endpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};