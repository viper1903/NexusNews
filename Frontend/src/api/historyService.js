import axios from 'axios';

const API_URL = 'http://localhost:8088/api/history';

// Logs that a user has viewed an article
const logArticleView = (articleData) => {
  return axios.post(API_URL, articleData);
};

// Gets the reading history for the logged-in user
const getHistory = () => {
  return axios.get(API_URL);
};

const deleteHistoryItem = (articleId) => {
  return axios.delete(`${API_URL}/${articleId}`);
};

const clearAllHistory = () => {
  return axios.delete(API_URL);
};

export default {
  logArticleView,
  getHistory,
  deleteHistoryItem, 
  clearAllHistory,   
};