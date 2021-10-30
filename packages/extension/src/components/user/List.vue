<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="department"
    :single-select="singleSelect"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:item.Profile.status="{ item }">
      <v-chip :color="getProfileClass(item.Profile.status)" dark> </v-chip>
      {{ item.Profile.statusName }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Members</v-toolbar-title>
        <span class="sub-title"> {{ users.length }} members </span>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="btn-add-member" v-bind="attrs" v-on="on">
              <v-icon name="user-plus" base-class="icon"></v-icon>
              Add Member
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.department"
                      label="Department"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.position"
                      label="Position"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.status"
                      label="Status"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogProfile" max-width="500px">
          <Profile
            v-show="dialogProfile"
            @close="closeProfile"
            :profile="editedItem"
            id="modal-profile"
            ref="profile"
          />
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="action-box" @click="openProfile(item)">
        <v-icon name="user" base-class="icon-12"></v-icon>
      </div>

      <!-- For version 2
      <div class="action-box" @click="editItem(item)">
        <v-icon name="calendar" base-class="icon-12"></v-icon>
      </div>
      <div class="action-box" @click="deleteItem(item)">
        <v-icon name="mail" base-class="icon-12"></v-icon>
      </div>
      <div class="action-box" @click="deleteItem(item)">
        <v-icon name="message-square" base-class="icon-12"></v-icon>
      </div>
      -->
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import UserService from '@/services/UserService'
import TeamService from '@/services/TeamService'
import Profile from './Profile'

export default {
  name: 'User',
  components: {
    Profile,
  },
  data() {
    return {
      singleSelect: false,
      selected: [],
      dialog: false,
      dialogDelete: false,
      dialogProfile: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'Profile.name',
        },
        { text: 'Department', value: 'Profile.department' },
        { text: 'Position', value: 'Profile.position' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'Profile.phone' },
        { text: 'Status', value: 'Profile.status' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        status: '',
      },
      defaultItem: {
        name: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        status: '',
      },
      totalCount: 0,
      selectedAvatar: null,
      selectedProfile: null,
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add User' : 'Edit User'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogProfile(val) {
      val || this.closeProfile()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    created() {
      console.log('User Created')
      UserService.getUsers()
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.log('There was an error: ', error.response)
        })
    },
    initialize() {
      //console.log("======> initialize", this.$store.state.user.teams.length, this.$store.state.user.teams[0].id)
      console.log('===== init List ', this.$store.state)
      if (this.$store.state.user.teams.length) {
        const team_id = this.$store.state.user.teams[0].id
        TeamService.getTeams(team_id)
          .then((response) => {
            console.log(response.data.team)
            this.users = response.data.team.members
          })
          .catch((error) => {
            throw error
          })
      }
      /*this.users = [
        {
          name: 'Frozen Yogurt',
          position: 'Project Manager',
          email: 'random@email.com',
          phone: '(647) 999-1234',
          status: 'OF',
          status_name: 'In office',
        },
        {
          name: 'Ice cream sandwich',
          position: 'UX/UI Designer',
          email: 'test1@email.com',
          phone: '(647) 999-5678',
          status: 'OF',
          status_name: 'In office',
        },
        {
          name: 'Eclair',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'WH',
          status_name: 'Work from home',
        },
        {
          name: 'Cupcake',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'VE',
          status_name: 'On vacation',
        },
        {
          name: 'Gingerbread',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'VE',
          status_name: 'On vacation',
        },
        {
          name: 'Jelly bean',
          position: 'Project Manager',
          email: 'random@email.com',
          phone: '(647) 999-1234',
          status: 'OF',
          status_name: 'In office',
        },
        {
          name: 'Lollipop',
          position: 'Project Manager',
          email: 'random@email.com',
          phone: '(647) 999-1234',
          status: 'WH',
          status_name: 'Work from home',
        },
        {
          name: 'Honeycomb',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'WH',
          status_name: 'Work from home',
        },
        {
          name: 'Donut',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'WH',
          status_name: 'Work from home',
        },
        {
          name: 'KitKat',
          position: 'Full-Stack Developer',
          email: 'test2@email.com',
          phone: '(647) 999-0000',
          status: 'WH',
          status_name: 'Work from home',
        },
      ]*/
    },

    editItem(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.dialog = true
    },
    deleteItem(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.dialogDelete = true
    },
    openProfile(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.selectedProfile = user
      this.selectedProfile.Profile.status_class =
        'profile-' + this.getProfileClass(user.Profile.status)
      this.dialogProfile = true
    },

    messageUser(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = Object.assign({}, user)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeProfile() {
      this.dialogProfile = false
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
    getProfileClass(status) {
      let status_color = ''
      switch (status) {
        case 'VA':
          status_color = 'vacation'
          break
        case 'OF':
          status_color = 'online'
          break
        default:
          status_color = 'other'
      }
      return status_color
    },
  },
}
</script>

<style scoped>
.v-toolbar__title {
  @apply ml-2;
}
</style>
