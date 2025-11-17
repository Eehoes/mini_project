import axios from "axios";

const BASE_URL = "http://localhost:8081"; // /events가 바로 매핑됨

export const fetchEvents = async () => {
  const res = await axios.get(`${BASE_URL}/events`);
  return res.data;
};

export const fetchEventDetail = async (id) => {
  const res = await axios.get(`${BASE_URL}/events/${id}`);
  return res.data;
};
