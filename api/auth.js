import { LOGIN, BASE_URL, REGISTER } from "../endpoint";

export const registerUser = user => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        nickname: user.username,
        password: user.password
      })
    })
      .then(response => {
        if (!response.ok) {
          reject("nulll");
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("nulll");
      });
  });
};

export const connecteUser = user => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
      .then(response => {
        if (!response.ok) {
          reject("erreur");
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
