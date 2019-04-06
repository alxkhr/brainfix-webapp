<template>
  <div>
    <span>{{ note.content }}</span>
    <button @click="onEdit">edit</button>
    <button @click="onRemove">remove</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DeleteNoteActionPayload } from './note.state';

export default Vue.extend({
  props: ['note'],
  methods: {
    onEdit(event: MouseEvent) {
      event.preventDefault();
      this.$router.push(`/note-details?id=${this.note.uuid}`);
    },
    onRemove(event: MouseEvent) {
      event.preventDefault();
      this.$store.dispatch('deleteNote', { uuid: this.note.uuid } as DeleteNoteActionPayload);
    },
  },
});
</script>

<style scoped>
</style>