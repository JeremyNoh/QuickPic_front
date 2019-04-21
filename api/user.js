import { PROFIL, BASE_URL } from "../endpoint";

export const PutInfoUser = (userToken, idPlayer, info) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + PROFIL + idPlayer, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(info)
    })
      // .then(response => {
      //   return response.json();
      // })
      .then(data => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getInfoUser = (userToken, idPlayer) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + PROFIL + idPlayer, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
