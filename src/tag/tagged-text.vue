<template>
  <div class="tagged-text">
    <div
      contenteditable="true"
      @input="onInput"
      @keydown="onKeyPressed"
      ref="container"
    >
      <template v-for="(textNode, index) of textNodes">
        <tag-view
          v-if="textNode.startsWith('#')"
          :name="textNode"
          :active="index === activeIndex"
          :key="generateKeyForTag(index)"
        />
        <template v-else>{{ textNode }}</template>
      </template>
    </div>
    <tag-list
      v-if="isTypingATag"
      :tags="recommendedTags"
      :activeElement="activeElement"
      @select="onTagSelected"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TagView from './tag.vue';
import TagList from './tag-list.vue';
import { CursorService } from './cursor.service';
import { Tag } from './tag.model';

export default Vue.extend({
  props: ['text'],
  created() {
    document.addEventListener('selectionchange', this.onSelectionChanged);
  },
  destroyed() {
    document.removeEventListener('selectionchange', this.onSelectionChanged);
  },
  updated() {
    console.log('updated', (this.$refs.container as HTMLDivElement).textContent);
    // 'activeElement' is a class property, computed AFTER the DOM has been updated
    this.activeElement = (this.$refs.container as HTMLElement).childNodes.item(
      this.activeIndex,
    ) as HTMLElement;
  },
  data() {
    return {
      savedCursor: -1,
      activeElement: null as HTMLElement | null,
    };
  },
  components: {
    TagView,
    TagList,
  },
  methods: {
    onSelectionChanged() {
      console.log('on selection changed');
      this.savedCursor = CursorService.getAbsoluteCursor(this.$refs.container as HTMLElement);
    },
    onInput(event: any) {
      console.log('on input', event.inputType);
      this.updateText();
    },
    onKeyPressed() {
      if (this.isTypingATag) {
        // TODO how to call tag-list
      }
    },
    generateKeyForTag(index: number): string {
      const textHash = Array.from(this.text as string).reduce(
        (accHash: number, curChar: string) => {
          let hash = (accHash << 5) - accHash + curChar.charCodeAt(0);
          return (hash |= 0);
        },
        0,
      );
      return `tag-${textHash}-${index}`;
    },
    onTagSelected(tag: Tag) {
      (this.activeElement as HTMLElement).innerText = tag.name;
      this.updateText();
    },
    updateText() {
      console.log('update text', (this.$refs.container as HTMLDivElement).textContent);
      this.savedCursor = CursorService.getAbsoluteCursor(this.$refs.container as HTMLElement);
      this.$emit('update:text', (this.$refs.container as HTMLDivElement).textContent);
      this.$nextTick(function() {
        console.log('next tick text', (this.$refs.container as HTMLDivElement).textContent);
        CursorService.applyCursor(this.$refs.container as HTMLElement, this.savedCursor);
      });
    },
  },
  computed: {
    textNodes(): string[] {
      console.log('compute text nodes', this.text);
      return this.text.split(/(#\w+)/g).filter((node: string) => Boolean(node));
    },
    activeIndex(): number {
      let index = -1;
      this.textNodes.reduce((accLength, curText, curIndex) => {
        if (accLength <= 0) {
          return accLength;
        }
        if (accLength <= curText.length) {
          index = curIndex;
        }
        return accLength - curText.length;
      }, this.savedCursor);
      return index;
    },
    isTypingATag(): boolean {
      const activeText = this.textNodes[this.activeIndex];
      return activeText !== undefined && activeText.startsWith('#');
    },
    recommendedTags(): string[] {
      if (!this.isTypingATag) {
        return [];
      }
      const query = this.textNodes[this.activeIndex];
      return this.$store.getters.searchTags(query);
    },
  },
});
</script>

<style scoped>
.tagged-text {
  position: relative;
}

.recommended-tags {
  position: absolute;
  top: 0;
  left: 0;
}
</style>