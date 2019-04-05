<template>
  <form>
    <input v-model="user">
    <input
      v-model="password"
      type="password"
    >
    <button @click="register">register</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { AuthenticationService } from './authentication.service';

export default Vue.extend({
  data: () => ({
    user: '',
    password: '',
  }),
  methods: {
    register: async function(event: MouseEvent) {
      event.preventDefault();
      try {
        await AuthenticationService.register(this.user, this.password);
        this.$router.push('/note-list');
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style scoped></style>