import apiClient from "./api-client.js";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const endpoint = "/hospitals";

export const getHospitalFinders = async (query) => {
  let hospitalFinders = await apiClient.get(`${endpoint}`);

  if (!hospitalFinders.ok) {
    throw { message: "Failed to fetch Hospital Finders.", status: 500 };
  }

  if (!hospitalFinders) hospitalFinders.data.data = [];

  hospitalFinders = hospitalFinders?.data?.data;

  if (query) {
    hospitalFinders = matchSorter(hospitalFinders, query, {
      keys: ["title", "description"],
    });
  }
  return hospitalFinders;
  // return hospitalFinders.sort(sortBy("profession", "skill", "updated_at", "description"));
};

export const getHospitalFinder = async (id) => {
  const hospitalFinder = await apiClient.get(`${endpoint}/${id}`);

  if (!hospitalFinder.ok) {
    throw { message: "Failed to fetch Hospital Finder.", status: 500 };
  }

  return hospitalFinder?.data?.data;
};

export const getHospitalFinderByUserId = async (userId) => {
  let hospitalFinder = await apiClient.get(`users/${userId}/curriculum_vitae`);

  if (!hospitalFinder.ok) {
    throw {
      message: `Failed to fetch curriculum vitae.`,
      status: 500,
    };
  }

  return hospitalFinder?.data?.data;
};

export const updateHospitalFinder = async (id, updates) => {
  const updatedHospitalFinder = await apiClient.post(
    `${endpoint}/${id}`,
    updates
  );

  if (!updatedHospitalFinder.ok) {
    throw { message: "Failed to update Hospital Finder.", status: 500 };
  }

  return updatedHospitalFinder?.data?.data;
};

export const createHospitalFinder = async (data) => {
  const newHospitalFinder = await apiClient.post(endpoint, data);

  if (!newHospitalFinder.ok) {
    throw { message: "Failed to create new Hospital Finder.", status: 500 };
  }

  return newHospitalFinder?.data?.data;
};
