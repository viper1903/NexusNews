import axios from 'axios';

const API_URL = 'http://localhost:8088/api/ai';

/**
 * Sends article content to the backend to get a summary.
 * @param {string} content - The full content of the article to be summarized.
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getSummary = (content) => {
  return axios.post(`${API_URL}/summarize`, { content });
};

export default {
  getSummary,
};