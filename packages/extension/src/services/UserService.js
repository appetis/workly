import apiClient from './apiClient'
import headers from './headers'

export default {
  getToken(data) {
    return apiClient.post('/api/token', data)
  },
  getUsers() {
    return apiClient.get('/api/users')
  },
  getUser(id) {
    return apiClient.get('/api/users/' + id)
  },
  addUser(data) {
    return apiClient.post('/api/users', data, { headers })
  },
}
