<template>
  <Navigation title="Dashboard" />

  <v-main class="bg-grey-lighten-2 h-100 ">
    <v-container>

      <v-text-field label="Search" @input="searchUser" v-model="searchText"></v-text-field>
      <v-alert :text="alertConf.text" :title="alertConf.title" :type="alertConf.type" position="relative"
        v-model="showAlert" closable></v-alert>

      <v-row class="mt-2" v-if="userData.length > 0">
        <template v-for="(user, index) in userData" :key="index">
          <v-col lg="4" md="4" sm="4">
            <v-card class="" max-width="374" @click="openDialog(user.id)">
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>
              <div class="d-flex align-center justify-space-around mt-4">
                <v-avatar :image="`https://randomuser.me/api/portraits/women/${user.id}.jpg`"></v-avatar>
              </div>

              <v-card-item>
                <v-card-title>{{ user.name }}</v-card-title>

                <v-card-subtitle>
                  <span class="me-1"><strong>Username: </strong>{{ user.username }}</span>

                </v-card-subtitle>
                <v-card-subtitle>
                  <span class="me-1"><strong>Phone: </strong>{{ user.phone }}</span>

                </v-card-subtitle>
                <v-card-subtitle>
                  <span class="me-1"><strong>Email: </strong>{{ user.email }}</span>
                </v-card-subtitle>
                <v-card-subtitle v-if="user.address">
                  <span class="me-1"><strong>City: </strong><v-chip>{{ user.address.city }}</v-chip></span>
                </v-card-subtitle>
              </v-card-item>

              <v-divider class="mx-4 mb-1"></v-divider>

            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>


    <v-dialog v-model="showDialog" max-width="480">
      <v-card title="User Details">
        <v-tabs color="grey-darken-2" centered>
          <v-tab v-for="link in links" :key="link" :text="link"></v-tab>
        </v-tabs>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="text" @click="showDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script setup>
import { useUser } from "@/api/user";
import config from "@/config";
import { onMounted, reactive, ref } from "vue";
import Fuse from 'fuse.js'
const user = useUser()
const userData = ref([])
const showAlert = ref(false)
const showDialog = ref(false)
const searchText = ref('')
const links = ['Contact Information',
  'Company details',]
const alertConf = reactive({
  title: '',
  text: '',
  type: 'error',
})
onMounted(() => {
  getUsers()
})

async function getUsers() {
  try {
    const res = await user.getAllUser()
    if (res.status === config.status.success) {
      userData.value = res.data
    } else {
      alertConf.type = config.statuscolor.error
      alertConf.title = config.messages.generalfail
      alertConf.title = error
      showAlert.value = true
    }
  } catch (error) {
    alertConf.type = config.statuscolor.error
    alertConf.title = config.messages.generalfail
    showAlert.value = true
  }
}

const searchUser = () => {
  if (searchText.value === '') {
    getUsers()
  }
  const options = {
    includeScore: true,
    keys: ['name', 'company.name']
  }

  const fuse = new Fuse(userData.value, options)

  const data = fuse.search(searchText.value)
  userData.value = data.map(item => item.item)
}

const openDialog = (id) => {
  console.log(id)
  showDialog.value = true
}
</script>