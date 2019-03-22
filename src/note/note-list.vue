<template>
  <div>
    <note-preview
      v-for="note in notes"
      :key="note.uuid"
      :note="note"
      :on-remove="onRemove"
    ></note-preview>
    <button v-on:click="create">create</button>
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
    this.notes = await NoteService.getNotes();
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