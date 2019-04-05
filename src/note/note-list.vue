<template>
  <div>
    <note-preview
      v-for="note in notes"
      :key="note.uuid"
      :note="note"
      :on-remove="onRemove"
    ></note-preview>
    <button @click="create">create</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../note/note.model';
import NotePreview from './note-preview.vue';
import NoteDetail from './note-detail.vue';
import { NoteService } from '../note/note.service';

export default Vue.extend({
  components: {
    NotePreview,
    NoteDetail,
  },
  data() {
    return {
      notes: [] as Note[],
    };
  },
  async mounted() {
    this.notes = (await NoteService.getNotes()).sort((a, b) => {
      if (a.dateModified > b.dateModified) {
        return 1;
      }
      if (a.dateModified < b.dateModified) {
        return -1;
      }
      return 0;
    });
  },
  methods: {
    create: function(event: MouseEvent) {
      event.preventDefault();
      this.$router.push('/note-details');
    },
    onRemove: function(note: Note) {
      this.notes.splice(this.notes.indexOf(note), 1);
    },
  },
});
</script>

<style scoped></style>