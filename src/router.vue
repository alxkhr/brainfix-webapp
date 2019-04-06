<template>
  <div>
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueRouter from 'vue-router';
import NoteDetail from './note/note-detail.vue';
import NoteList from './note/note-list.vue';
import Register from './authentication/register.vue';
import Login from './authentication/login.vue';
import SyncSettings from './sync/sync-settings.vue';
import Navigation from './navigation/navigation.vue';

Vue.use(VueRouter);

export default Vue.extend({
  components: {
    Navigation,
  },
  router: new VueRouter({
    mode: 'hash',
    routes: [
      { path: '/note-details', component: NoteDetail, props: (route) => ({ id: route.query.id }) },
      { path: '/note-list', component: NoteList },
      { path: '/register', component: Register },
      { path: '/login', component: Login },
      { path: '/sync-settings', component: SyncSettings },
    ],
  }),
});
</script>

<style scoped></style>