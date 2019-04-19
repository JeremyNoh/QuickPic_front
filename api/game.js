import { BASE_URL, RANKING, HISTORY } from "../endpoint";

export const getRanking = (userId, userToken) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + RANKING + userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          reject("error");
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("error");
      });
  });
};

export const getHistory = userToken => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + HISTORY, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          reject("error");
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("error");
      });
  });
};
