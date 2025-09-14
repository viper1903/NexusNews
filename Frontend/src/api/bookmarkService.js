import axios from 'axios';

// The base URL for our user-auth-service endpoints via the gateway
const API_URL = 'http://localhost:8088/api/bookmarks';

// Gets all bookmark details for the logged-in user
const getBookmarks = () => {
  return axios.get(API_URL);
};

// Gets only the IDs of the bookmarked articles (for performance)
const getBookmarkIds = () => {
  return axios.get(`${API_URL}/ids`);
};

// Adds a new bookmark
const addBookmark = (articleData) => {
  return axios.post(API_URL, articleData);
};

// Removes a bookmark by article ID
const removeBookmark = (articleId) => {
  return axios.delete(`${API_URL}/${articleId}`);
};

export default {
  getBookmarks,
  getBookmarkIds,
  addBookmark,
  removeBookmark,
};