<template>
  <form>
    <input
      class="url-input"
      v-model="url"
    >
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { SyncState, SetServerUrlActionPayload } from './sync.state';
export default Vue.extend({
  computed: {
    url: {
      get(): string {
        return this.$store.state.sync.serverUrl;
      },
      set(url: string) {
        this.$store.dispatch('setServerUrl', {
          serverUrl: url,
        } as SetServerUrlActionPayload);
      },
    },
  },
});
</script>

<style scoped>
.url-input {
  width: 300px;
}
</style>