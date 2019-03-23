import Vue from 'vue';

Vue.directive('editable-tags', {
  bind: function(el: HTMLElement) {
    el.setAttribute('contenteditable', 'true');
  },
});
