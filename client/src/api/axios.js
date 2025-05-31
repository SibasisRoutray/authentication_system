import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // change this to your backend URL
  withCredentials: true,               // needed for cookies
});

export default API;
