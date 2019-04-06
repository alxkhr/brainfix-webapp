import Vue from 'vue';

Vue.directive('editable-tags', {
  bind(el: HTMLElement) {
    el.setAttribute('contenteditable', 'true');
  },
});
