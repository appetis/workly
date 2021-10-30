import axios from 'axios'
import LocalStorageService from './LocalStorageService'

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
      const tokens = LocalStorageService.getData('tokens')

      //console.log("apiClient ===>", tokens)
      if (tokens) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => {
    //   console.log("apiClient response ==== > ", response)
    if (response.config.parse) {
      //perform the manipulation here and change the response object
    }
    return response
  },
  (error) => {
    const originalRequest = error.config
    if (error.response.data.code === 461) {
      //console.log("api Client error ===>", error.response.data.code, error.response.data.message)
      return apiClient
        .post('/api/auth/refresh', {
          refreshToken: LocalStorageService.getData('tokens').refreshToken,
        })
        .then((res) => {
          //state.user.tokens = tokens
          const tokens = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }
          LocalStorageService.setData('tokens', tokens)

          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`

          return apiClient(originalRequest)
        })
    }
    return Promise.reject(error)
  }
)

export default apiClient
