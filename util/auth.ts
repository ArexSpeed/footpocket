import axios from 'axios';

const API_KEY = "AIzaSyAc-CYouvvJmZjACiPz8YE99tUZ0fOKAqI";

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  // console.log("authenticate end", mode, email, password, url);

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // console.log("resposne", response);
  //const token = response.data.idToken;
  const user = {
    id: response.data.localId,
    email: response.data.email,
    token: response.data.idToken,
  }
  return user;
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}