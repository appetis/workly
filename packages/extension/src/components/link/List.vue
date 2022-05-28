<template>
  <div>
    <Loading :isLoading="isLoading" />

    <template>
      <v-toolbar flat>
        <v-toolbar-title class="ml-2">Links</v-toolbar-title>
        <span class="sub-title">
          {{ count.total }} links ({{ count.shared_links }} shared,
          {{ count.private_links }} private)
        </span>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="btn-add-member"
              v-bind="attrs"
              v-on="on"
              v-show="isReady"
            >
              <v-icon name="link" base-class="icon"></v-icon>
              Add Links
            </div>
          </template>

          <v-card id="modal-add-member">
            <v-card-title>
              <span class="text-h5">Add Link</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      class="d-flex"
                      cols="12"
                  >
                    <v-select
                        :items="card_input.targets"
                        label="Standard"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Title"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn
                color="blue darken-1"
                id="btn-save-member"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <div class="w-full text-wk-dark border-t border-gray-200 mb-10"></div>

      <div class="mx-6" v-show="isReady">
        <div class="font-semibold ml-2 text-sm mb-2">Shared with Me</div>
        <v-row dense>
          <v-col
            v-for="card in cards.shared_links"
            :key="card.title"
            :cols="card.flex"
            class="px-2 relative"
          >
            <v-card class="link">
              <div
                class="absolute white py-1 px-1.5 top-3 right-3 z-10 shadow-sm rounded cursor-pointer"
                v-bind:class="{ hidden: !card.more }"
                @mouseover="fnOn(card)"
                @mouseout="fnOut(card)"
              >
                <v-icon
                  name="more-horizontal"
                  base-class="icon-14 text-black"
                ></v-icon>
              </div>
              <v-img
                :src="card.src"
                class="white--text align-end rounded-lg cursor-pointer"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                @mouseover="fnOn(card)"
                @mouseout="fnOut(card)"
              >
              </v-img>

              <v-card-actions class="font-bold"> Admin Page</v-card-actions>
              <div class="font-bold border-b border-solid opacity-50"></div>
              <v-card-actions> Added 3 days ago </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="font-semibold ml-2 text-sm mb-2 mt-14">Private</div>
        <v-row dense>
          <v-col
            v-for="card in cards.private_links"
            :key="card.title"
            :cols="card.flex"
            class="px-2 relative"
          >
            <v-card class="link">
              <div
                class="absolute white py-1 px-1.5 top-3 right-3 z-10 shadow-sm rounded cursor-pointer"
                v-bind:class="{ hidden: !card.more }"
                @mouseover="fnOn(card)"
                @mouseout="fnOut(card)"
              >
                <v-icon
                  name="more-horizontal"
                  base-class="icon-14 text-black"
                ></v-icon>
              </div>
              <v-img
                :src="card.src"
                class="white--text align-end rounded-lg cursor-pointer"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                @mouseover="fnOn(card)"
                @mouseout="fnOut(card)"
              >
              </v-img>

              <v-card-actions class="font-bold"> Admin Page</v-card-actions>
              <div class="font-bold border-b border-solid opacity-50"></div>
              <v-card-actions> Added 3 days ago </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </template>
  </div>
</template>

<script>
import Loading from '../loading/Loading'
export default {
  name: 'Link',
  // mounted() {
  //   browser.runtime.sendMessage({});
  // },
  data() {
    return {
      isLoading: true,
      isReady: false,
      dialog: false,
      card_input: {
        targets: ['Shared with Me', 'Private'],
      },
      cards: {
        shared_links: [],
        private_links: [],
      },
      count: {
        total: 0,
        shared_links: 0,
        private_links: 0,
      },
    }
  },
  computed: {},
  components: {
    Loading,
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      window.setTimeout(() => {
        this.cards = {
          shared_links: [
            {
              id: 1,
              title: 'Pre-fab homes',
              src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
              flex: 2,
              more: false,
            },
            {
              id: 2,
              title: 'Favorite road trips',
              src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
              flex: 2,
              more: false,
            },
            {
              id: 3,
              title: 'Best airlines',
              src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
              flex: 2,
              more: false,
            },
            {
              id: 4,
              title: 'Best airlines2',
              src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
              flex: 2,
              more: false,
            },
          ],
          private_links: [
            {
              id: 1,
              title: 'Pre-fab homes',
              src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
              flex: 2,
              more: false,
            },
            {
              id: 2,
              title: 'Favorite road trips',
              src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
              flex: 2,
              more: false,
            },
          ],
        }
        this.count.shared_links = this.cards.shared_links.length
        this.count.private_links = this.cards.private_links.length
        this.count.total = this.count.shared_links + this.count.private_links
        this.$store.dispatch('setLoading', false)
        this.isReady = true
      }, 3000)
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    fnOn(card) {
      card.more = true
    },
    fnOut(card) {
      card.more = false
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        const profile = this.editedItem
        const user = {
          id: 0,
          email: this.editedItem.email,
          Profile: profile,
        }
        this.users.push(user)
      }
      this.close()
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
