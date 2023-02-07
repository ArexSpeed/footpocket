import axios from "axios";

interface User {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
}

const BACKEND_URL =
  "https://footpoocket-default-rtdb.europe-west1.firebasedatabase.app/";

  export async function fetchUser(userName: string) {
    const response = await axios.get(`${BACKEND_URL}/users.json`);
    const users = [];

    //users.find((user) => user)
    for (const key in response.data) {
        const userObj = {
          id: key,
          name: response.data[key].name,
          email: response.data[key].email,
          imageUrl: response.data[key].imageUrl,
        };
    
        users.push(userObj);
      }
    const userId = users.find((user) => user.name === userName)?.id;
    //console.log("fetch user",users);
    return userId;
  }

  export async function fetchUserByEmail(userEmail: string) {
    const response = await axios.get(`${BACKEND_URL}/users.json`);
    const users = [];

    //users.find((user) => user)
    for (const key in response.data) {
        const userObj = {
          id: key,
          name: response.data[key].name,
          email: response.data[key].email,
          imageUrl: response.data[key].imageUrl,
        };
    
        users.push(userObj);
      }
    const userId = users.find((user) => user.email === userEmail);
    //console.log("fetch user",users);
    return userId;
  }

export async function createUser(userData: User) {
  const response = await axios.post(
    BACKEND_URL + "/users.json",
    userData
  );
  console.log("response create USer", response)
  const id = response.data.name;
  return id;
}

export async function updateUser(userData: User, userKey: string | undefined) {
    const response = await axios.patch(`${BACKEND_URL}/users/${userKey}.json`, userData);
    console.log("response create USer", response)
    const id = response.data.name;
    return id;
  }