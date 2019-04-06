import Vue from 'vue';

import Router from './router.vue';
import store from './store';

new Vue({
  el: '#main',
  store,
  render: (h) => h(Router),
});
