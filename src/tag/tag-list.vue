<template>
  <div
    class="tag-list"
    :style="transformationStyle"
  >
    <button
      class="tag"
      v-for="(tag, index) of tags"
      :key="index"
      @click="() => onClick(tag)"
    >{{ tag.name }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag } from './tag.model';
export default Vue.extend({
  props: ['tags', 'activeElement'],
  computed: {
    transformationStyle(): string {
      return ` transform: translate(${this.activeElement.offsetLeft}px, ${this.activeElement
        .offsetTop + this.activeElement.offsetHeight}px);`;
    },
  },
  methods: {
    onClick(tag: Tag) {
      console.log('on click tag list');
      this.$emit('select', tag);
    },
    onKeyPressed(event: KeyboardEvent) {
      // TODO how to call from outside
      switch (event.code) {
        case 'Enter':
          console.log('use selected recommendation');
          event.preventDefault();
          return;
        case 'ArrowDown':
          console.log('select lower tag recommendation');
          event.preventDefault();
          return;
        case 'ArrowUp':
          console.log('select upper tag recommendation');
          event.preventDefault();
          return;
        default:
          return;
      }
    },
  },
});
</script>

<style scoped>
.tag-list {
  position: absolute;
  top: 0;
  left: 0;
}
.tag {
  background: #fff;
  display: block;
}
</style>