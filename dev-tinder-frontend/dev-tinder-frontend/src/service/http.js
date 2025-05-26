import api from "./axios";

export const getData = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const PostMethod = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMethodUrl = async (url) => {
  try {
    const response = await api.post(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const patchMethod = async (url, data) => {
  try {
    const response = await api.patch(url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
