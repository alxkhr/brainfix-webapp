<template>
  <form>
    <input v-model="user">
    <input
      v-model="password"
      type="password"
    >
    <button v-on:click="login">login</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    user: '',
    password: '',
  }),
  methods: {
    login: async function(event: MouseEvent) {
      event.preventDefault();
      const response = await fetch('https://brainfix.retterdesapok.de/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: this.user, password: this.password }),
      });
      if (!response.ok) {
        return;
      }
      const token = await response.text();
      if (!token) {
        return;
      }
      localStorage.setItem('token', token);
      this.$router.push('/note-list');
    },
  },
});
</script>

<style scoped></style>