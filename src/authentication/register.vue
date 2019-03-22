<template>
  <form>
    <input v-model="user">
    <input
      v-model="password"
      type="password"
    >
    <button v-on:click="register">login</button>
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
    register: async function(event: MouseEvent) {
      event.preventDefault();
      const response = await fetch('http://brainfix.retterdesapok.de:8080/api/requestToken', {
        method: 'POST',
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
    },
  },
});
</script>

<style scoped></style>