<template>
  <form>
    <input v-model="user">
    <input
      v-model="password"
      type="password"
    >
    <button @click="login">login</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { LoginActionPayload } from './authentication.state';

export default Vue.extend({
  data: () => ({
    user: '',
    password: '',
  }),
  methods: {
    login: async function(event: MouseEvent) {
      event.preventDefault();
      try {
        await this.$store.dispatch('login', {
          username: this.user,
          password: this.password,
        } as LoginActionPayload);
        this.$router.push('/note-list');
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style scoped></style>