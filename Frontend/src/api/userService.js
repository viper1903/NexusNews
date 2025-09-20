import axios from 'axios';

// const API_URL = 'http://localhost:8088/api/users';
const API_URL = 'https://api-gateway-u59l.onrender.com/api/users';

// Function to get the current user's profile data
const getMyProfile = () => {
  return axios.get(`${API_URL}/me`);
};

export default {
  getMyProfile,
};