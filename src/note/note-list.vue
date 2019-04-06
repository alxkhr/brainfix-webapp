<template>
  <div>
    <note-preview
      v-for="note in notes"
      :key="note.uuid"
      :note="note"
    ></note-preview>
    <button @click="create">create</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Note } from '../note/note.model';
import NotePreview from './note-preview.vue';
import NoteDetail from './note-detail.vue';

export default Vue.extend({
  components: {
    NotePreview,
    NoteDetail,
  },
  computed: {
    notes(): Note[] {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    create(event: MouseEvent) {
      event.preventDefault();
      this.$router.push('/note-details');
    },
  },
});
</script>

<style scoped></style>