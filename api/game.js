import {
  BASE_URL,
  RANKING,
  HISTORY,
  GAMES,
  API_RECONIZATION
} from "../endpoint";
import { KEY_IMMAGA } from "../utils/const";

// GET CLASSEMENT  OF ALL USER
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

// GET HISTORY OF ONE USER
export const getHistory = (userId, userToken) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + HISTORY + userId, {
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

// GET ALL GAME
export const getAllGames = userToken => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + GAMES, {
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

// POST SCORE FOR UPGRADE POINT OF THE USER
export const PostScoreInOneGame = (userToken, idGame, info) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + GAMES + idGame, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        pourcentage: info.pourcentage,
        uuid: info.uuid
      })
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

// GET ALL DETAILS OF THE IMAGE SEND
export const ReconnaissanceImage = photoUrl => {
  return new Promise((resolve, reject) => {
    fetch(API_RECONIZATION + photoUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: KEY_IMMAGA
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result.tags);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
