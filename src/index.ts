import Vue from 'vue';

import Router from './router.vue';
import store from './store';

store.dispatch('loadInitialState').then(() => {
  new Vue({
    el: '#main',
    store,
    render: (h) => h(Router),
  });
});
