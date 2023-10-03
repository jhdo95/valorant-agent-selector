import * as usersAPI from './users-api';

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  // Baby step by returning whatever is sent back by the server
  return getUser();
}

export async function login(credentials) {
  try {
    // Delegate network request code to users-api.js API module
    // which will return a JWT upon login success
    const token = await usersAPI.login(credentials);

    // Store the JWT in in local storage for future authenticated requests
    localStorage.setItem('token', token);

    // Return the user object extracted from JWT
    return getUser();

  } catch (error) {
    throw new Error('Login Failed - Try Again');
  }
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');


  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();

  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}