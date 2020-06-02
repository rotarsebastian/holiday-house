const endpoint = 'http://ec2-13-48-148-107.eu-north-1.compute.amazonaws.com:5555/api/reservations';

export const getUserReservation = async(id) => {
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

export const getUserReservations = async(offset) => { 
    try {
        const options = {
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(endpoint + '?offset=' + offset, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const deleteReservation = async(id) => {
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

export const createReservation = async(id, reservationData) => {
    try {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationData)
        };
        const response = await fetch(endpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const editReservation = async(id, editData) => { 
    try {
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editData)
        };
        const response = await fetch(endpoint + '/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};