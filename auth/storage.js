/* eslint-disable import/no-anonymous-default-export */
"use client";
const key = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const storeToken = (authToken) => {
  try {
    localStorage.setItem(key, authToken);
  } catch (error) {
    console.error("Error storing the auth token", error);
  }
};

const getToken = () => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting the auth token", error);
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing the auth token", error);
  }
};

export default { getToken, removeToken, storeToken };
