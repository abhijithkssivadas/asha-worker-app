import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.43.176:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;