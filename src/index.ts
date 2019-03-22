import Dexie from 'dexie';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Router from './router.vue';

const db = new Dexie('Brainfix');

db.version(1).stores({
  notes: 'uuid, content',
});

Vue.use(VueRouter);

new Vue({
  el: '#main',
  render: (h) => h(Router),
});
