<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const rail = ref(true);
const route = useRoute();
</script>

<template>
    <v-navigation-drawer
        expand-on-hover
        rail
        color="#020341"
        rail-width="60"
      >
        <v-list>
          <v-list-item
            prepend-avatar="@/assets/images/logo.png"
            title="Secure Storage System"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item to="/profile">
            <template v-slot:prepend>
                <v-icon size="large">
                    <img 
                        src="@/assets/images/icons/profile.svg" 
                        class="w-5 h-5 min-w-5 min-h-5" 
                    />
                </v-icon>
            </template>
            <v-list-item-title>
                Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/storage">
            <template v-slot:prepend>
                <v-icon size="large">
                    <img 
                        src="@/assets/images/icons/storage.svg" 
                        class="w-5 h-5 min-w-5 min-h-5" 
                    />
                </v-icon>
            </template>
            <v-list-item-title>
                Storage
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/tools">
            <template v-slot:prepend>
                <v-icon size="large">
                    <img 
                        src="@/assets/images/icons/tools.svg" 
                        class="w-5 h-5 min-w-5 min-h-5" 
                    />
                </v-icon>
            </template>
            <v-list-item-title>
                Tools
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/">
            <template v-slot:prepend>
                <v-icon size="large">
                    <img 
                        src="@/assets/images/icons/list.svg" 
                        class="w-5 h-5 min-w-5 min-h-5" 
                    />
                </v-icon>
            </template>
            <v-list-item-title>
                Something
            </v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
