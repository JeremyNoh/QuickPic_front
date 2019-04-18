import { BASE_URL, RANKING } from "../endpoint";

export const getRanking = userToken => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + RANKING, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          reject(err);
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
