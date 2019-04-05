<template>
  <div>
    <router-link to="/note-list">notes</router-link>
    <router-link
      v-if="!token"
      to="/register"
    >register</router-link>
    <router-link
      v-if="!token"
      to="/login"
    >login</router-link>
    <a
      href="#"
      v-if="token"
      @click="logout"
    >logout</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConfigService } from '../config/config.service';
export default Vue.extend({
  data: () => ({
    token: ConfigService.getToken(),
  }),
  methods: {
    logout: function(event: MouseEvent) {
      event.preventDefault();
      ConfigService.setToken(null);
    },
  },
});
</script>

<style scoped>
</style>