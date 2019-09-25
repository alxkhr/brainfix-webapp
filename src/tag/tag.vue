<template>
  <span
    class="tag"
    :class="{ active: active }"
    ref="tag"
  >{{ name }}</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['name', 'active'],
});
</script>

<style scoped>
.tag {
  color: red;
}
</style>