<template>
  <div>
    <p>User List</p>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'User',
  data() {
    return {
      users: []
    }
  },
  created() {
    UserService.getUsers()
      .then(response => {
        this.users = response.data
      })
      .catch(error => {
        console.log('There was an error: ', error.response)
      })
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
