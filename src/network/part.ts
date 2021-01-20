import axios from 'axios';

let url = process.env.REACT_APP_BACKEND_URL as string;

export const searchParts = async (name: string, page: number) => {
  try {
    let res = await axios.get(`${url}/search?name=${name}&page=${page}`, { withCredentials: true }) as any;
    return res.data;
  }
  catch (e) {
    return { parts: [], has_more: false };
  }
}

export const addPartForUser = async (name: string) => {
  try {
    let res = await axios.post(`${url}/addPart`, { name }, { withCredentials: true }) as any;
    return res.data.Message;
  }
  catch (e) {
    return "Failure"
  }
}

export const loadPartsForUser = async (page: number, name: string) => {
  try {
    let res = await axios.get(`${url}/userParts?page=${page}&name=${name}`, { withCredentials: true }) as any;
    return res.data;
  }
  catch (e) {
    return [];
  }
}

export const deleteUserPart = async (name: string) => {
  try {
    let res = await axios.post(`${url}/removePart`, { name }, { withCredentials: true }) as any;
    return res.data.Message;
  }
  catch (e) {
    return "Failure"
  }
}