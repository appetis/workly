import apiClient from './apiClient'
//import headers from './headers'

export default {
  login(data) {
    return apiClient.post('/api/auth/login', data)
  },
  refresh(data) {
    return apiClient.post('/api/auth/refresh', data)
  },
  logout(data) {
    return apiClient.post('/api/auth/logout', data)
  },
  getUsers() {
    return apiClient.get('/api/users')
  },
  getUser(id) {
    return apiClient.get('/api/users/' + id)
  },
  getUserStatus(id) {
    return apiClient.get(`/api/users/${id}/status`)
  },
  addUser(data) {
    return apiClient.post('/api/users', data)
  },
  verify(userid, data) {
    return apiClient.post(`/api/users/${userid}/verify`, data)
  },
  updateProfile(id) {
    return apiClient.post(`/api/users/${id}/profile`)
  },
  updateAvatar(id, data) {
    return apiClient.post(`/api/users/${id}/avatar`, data)
  },
}
