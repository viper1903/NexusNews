import axios from "axios";

// const API_URL = "http://localhost:8088/api/auth";
const API_URL = "https://api-gateway-u59l.onrender.com/api/auth";

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export default {
  register,
  login,
};
