import { checkResponse } from "./api";

const baseUrl =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_BASE_URL) ||
  "http://localhost:3001";

export function signUserIn(data) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function signUserUp(data) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function fetchUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
