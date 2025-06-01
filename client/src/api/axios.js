import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({
  baseURL:  `${API_BASE_URL}/api/auth`,
  withCredentials: true,            
});

export default API;
