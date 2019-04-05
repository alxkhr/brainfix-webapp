<template>
  <div>
    <input v-model="note.content">
    <button
      v-if="id"
      @click="remove"
    >remove</button>
    <button @click="submit">submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../note/note.model';
import { NoteService } from '../note/note.service';

export default Vue.extend({
  props: ['id'],
  methods: {
    submit: function(event: MouseEvent) {
      event.preventDefault();
      NoteService.putNote(this.note);
      this.$router.push('/note-list');
    },
    remove: function(event: MouseEvent) {
      event.preventDefault();
      NoteService.deleteNote(this.note);
      this.$router.push('/note-list');
    },
  },
  data: (): { note: Note } => ({
    note: NoteService.getNewNote(),
  }),
  async mounted() {
    if (this.id) {
      const note = await NoteService.getNote(this.id);
      if (note) {
        this.note = note;
      }
    }
  },
});
</script>

<style scoped></style>