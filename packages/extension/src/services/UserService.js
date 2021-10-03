import apiClient from './apiClient'
//import headers from './headers'

export default {
  login(data) {
    return apiClient.post('/api/login', data)
  },
  getUsers() {
    return apiClient.get('/api/users')
  },
  getUser(id) {
    return apiClient.get('/api/users/' + id)
  },
  addUser(data) {
    return apiClient.post('/api/users', data)
  },
  verify(userid, data) {
    return apiClient.post(`/api/users/${userid}/verify`, data)
  },
}
