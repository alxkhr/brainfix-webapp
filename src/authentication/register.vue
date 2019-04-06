<template>
  <form>
    <input v-model="user">
    <input
      v-model="password"
      type="password"
    >
    <button @click="onRegister">register</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { RegisterActionPayload } from './authentication.state';

export default Vue.extend({
  data: () => ({
    user: '',
    password: '',
  }),
  methods: {
    async onRegister(event: MouseEvent) {
      event.preventDefault();
      try {
        await this.$store.dispatch('register', {
          username: this.user,
          password: this.password,
        } as RegisterActionPayload);
        this.$router.push('/note-list');
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style scoped></style>