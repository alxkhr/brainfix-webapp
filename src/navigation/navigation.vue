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
      @click="onLogout"
    >logout</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AuthenticationState } from '../authentication/authentication.state';

export default Vue.extend({
  computed: {
    token(): string | undefined {
      return this.$store.state.authentication.token;
    },
  },
  methods: {
    onLogout(event: MouseEvent) {
      event.preventDefault();
      this.$store.dispatch('logout');
    },
  },
});
</script>

<style scoped>
</style>