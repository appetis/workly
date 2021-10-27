import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  //baseURL: 'https://api.workly.page/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
