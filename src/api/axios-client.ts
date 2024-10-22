import { API_BASE_URL } from '@/constants/config';
import { getUserSession } from '@/lib/auth';
import axios from 'axios';
import { Session } from 'next-auth';

const BASE_URL = API_BASE_URL;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 10000
});

// Request interceptor for adding auth token
axiosClient.interceptors.request.use(
  async (config) => {
     const session: Session | null = await getUserSession();
    if (session?.user && 'token' in session.user) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;