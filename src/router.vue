<template>
  <div>
    <div>
      <router-link to="/note-list">notes</router-link>
      <router-link to="/register">login</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueRouter from 'vue-router';
import NoteDetail from './note/note-detail.vue';
import NoteList from './note/note-list.vue';
import Register from './authentication/register.vue';

export default Vue.extend({
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/note-details', component: NoteDetail, props: (route) => ({ id: route.query.id }) },
      { path: '/note-list', component: NoteList },
      { path: '/register', component: Register },
    ],
  }),
});
</script>

<style scoped></style>