<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer location="left" permanent v-model="drawer">
        <template v-slot:prepend>
            <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
                subtitle="Logged in" title="Jane Smith"></v-list-item>
        </template>

        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-home" title="Dashboard" :to="{ name: 'dashboard' }"></v-list-item>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-clipboard-file" title="Products CRUD"
                :to="{ name: 'products' }"></v-list-item>
            <v-list-item prepend-icon="mdi-clipboard-file" title="Teams CRUD" :to="{ name: 'teams' }"></v-list-item>
            <v-list-item prepend-icon="mdi-bell" title="Notifications" :to="{ name: 'notifications' }"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-message-cog" title="API Integration" value="api"></v-list-item> -->
            <v-list-item prepend-icon="mdi-file" title="Import CSV" value="csv"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
defineProps({
    title: {
        type: String,
        default: 'title'
    }
})
const drawer = ref(false)
</script>