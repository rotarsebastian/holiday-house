const endpoint = 'http://localhost:5555/api/users';

const auth = {
    isAuthenticated: false,
    email: undefined,
    userID: undefined
}

export const login = async(email, password) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            email,
            password
          ])
        };
        const response = await fetch(endpoint + '/login', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const checkAuth = async() => {
    try {
        const options = {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(endpoint + '/checkauth', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const logout = async() => {
    try {
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      };
      const response = await fetch(endpoint + '/logout', options);
      const data = await response.json();
      return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const recoverOrResendValidation = async(email) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([ email ])
      };
      const response = await fetch(endpoint + '/recover', options);
      const data = await response.json();
      return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const register = async(first_name, last_name, birthdate, email, password, repeatPassword) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([ first_name, last_name, birthdate, email, password, repeatPassword ])
        };
        const response = await fetch(endpoint + '/register', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const changePassword = async(password, repeatPassword, key) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([ password, repeatPassword, key ])
        };
        const response = await fetch(endpoint + '/resetpass', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const deleteUser = async() => {
    try {
        const options = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        };
        const response = await fetch(endpoint, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const getSpecificUser = async(id) => {
    try {
        const options = {
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

export default auth;