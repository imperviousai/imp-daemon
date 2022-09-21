import axios from "axios";

export const IP = "localhost";
export const PORT = 8882;

export const request = axios.create({
  baseURL: `http://${IP}:${PORT}`,
});
