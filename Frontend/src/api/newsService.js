import axios from 'axios';

// Note: The base URL is now for the news service endpoint via the gateway
const API_URL = 'http://localhost:8088/api/news';

// Fetches a page of articles
const getArticles = (page = 0, size = 9) => {
  return axios.get(`${API_URL}?page=${page}&size=${size}`);
};

// Searches for articles with a keyword
const searchArticles = (keyword, page = 0, size = 9) => {
  return axios.get(`${API_URL}/search/${keyword}?page=${page}&size=${size}`);
};

const getArticlesByCategory = (category, page = 0, size = 9) => {
  return axios.get(`${API_URL}/category/${category}?page=${page}&size=${size}`);
};

const getArticleById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default {
  getArticles,
  searchArticles,
  getArticlesByCategory,
  getArticleById,
};