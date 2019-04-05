<template>
  <form>
    <input
      class="url-input"
      v-model="url"
      @input="onUrlChange"
    >
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConfigService } from '../config/config.service';
export default Vue.extend({
  data: () => ({
    url: ConfigService.getServerUrl(),
  }),
  methods: {
    onUrlChange: function() {
      ConfigService.setServerUrl(this.url);
    },
  },
});
</script>

<style scoped>
.url-input {
  width: 300px;
}
</style>