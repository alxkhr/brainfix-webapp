<template>
  <div>
    <!-- <div v-editable-tags="note.content"></div> -->
    <tagged-text :text.sync="note.content" />
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
import {
  UpdateNoteActionPayload,
  DeleteNoteActionPayload,
  CreateNoteActionPayload,
} from './note.state';
import { NoteService } from './note.service';
// import '../tag/editable-tags.directive';
import TaggedText from '../tag/tagged-text.vue';

export default Vue.extend({
  props: ['id'],
  components: {
    TaggedText,
  },
  methods: {
    submit(event: MouseEvent) {
      event.preventDefault();
      if (this.id) {
        this.$store.dispatch('updateNote', { notePartial: this.note } as UpdateNoteActionPayload);
      } else {
        this.$store.dispatch('createNote', { note: this.note } as CreateNoteActionPayload);
      }
      this.$router.push('/note-list');
    },
    remove(event: MouseEvent) {
      event.preventDefault();
      this.$store.dispatch('deleteNote', { uuid: this.note.uuid } as DeleteNoteActionPayload);
      this.$router.push('/note-list');
    },
  },
  data: function(): { note: Note } {
    const note: Note = this.id
      ? this.$store.getters.getNoteByUuid(this.id)
      : NoteService.getEmptyNote();
    return { note: { ...note } };
  },
});
</script>

<style scoped></style>