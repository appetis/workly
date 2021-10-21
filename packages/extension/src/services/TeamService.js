import apiClient from './apiClient'

export default {
  getTeams(teamId) {
    return apiClient.get(`/api/teams/${teamId}/members`)
  },
}
