// ====================== PRODUCTION ======================
export const endpoint = 'http://ec2-13-48-148-107.eu-north-1.compute.amazonaws.com:5555/api';

// ====================== DEVELOPMENT ======================
// export const endpoint = 'http://localhost:5555/api';

const usersEndpoint = endpoint + '/users';

const auth = {
  isAuthenticated: undefined,
  user: undefined,

  showModal: undefined,
  redirectTo: undefined,
  changeKey: undefined,
  countLoadedImages: 0
}

export const login = async(loginData) => {
    try {
        const options = {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        };
        const response = await fetch(usersEndpoint + '/login', options);
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
        const response = await fetch(usersEndpoint + '/checkauth', options);
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
        }
      };
      const response = await fetch(usersEndpoint + '/logout', options);
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
        body: JSON.stringify(email)
      };
      const response = await fetch(usersEndpoint + '/recover', options);
      const data = await response.json();
      return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const register = async(registerData) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        };
        const response = await fetch(usersEndpoint + '/register', options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export const changePassword = async(changePassData) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(changePassData)
        };
        const response = await fetch(usersEndpoint + '/resetpass', options);
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
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(usersEndpoint, options);
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
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(usersEndpoint + '/user/' + id, options);
        const data = await response.json();
        return data;
    }
    catch(err) {
        return { status: 0, message: 'Can not connect to the server', code: 999 };
    }
};

export default auth;