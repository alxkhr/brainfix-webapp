<template>
  <div>
    <span>{{ note.content }}</span>
    <button v-on:click="edit">edit</button>
    <button v-on:click="remove">remove</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { NoteService } from '../note/note.service';

export default Vue.extend({
  props: ['note', 'onRemove'],
  methods: {
    edit: function(event: MouseEvent) {
      event.preventDefault();
      this.$router.push(`/note-details?id=${this.note.uuid}`);
    },
    remove: function(event: MouseEvent) {
      event.preventDefault();
      NoteService.deleteNote(this.note.uuid);
      this.onRemove(this.note);
    },
  },
});
</script>

<style scoped>
</style>