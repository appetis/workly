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
        const tokens = JSON.parse(localStorage.getItem('tokens'))

        console.log("apiClient ===>", tokens)
        if (tokens) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
