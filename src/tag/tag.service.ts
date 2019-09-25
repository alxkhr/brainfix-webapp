import { Note } from '../note/note.model';
import { Tag } from './tag.model';

export namespace TagService {
  export function getTagsInNotes(notes: Note[]): Tag[] {
    const tags: Tag[] = [];
    notes.forEach((note) => {
      (note.content.match(/#[^( |\xa0|\n|#)]+/g) || []).forEach((match) => {
        const existingTag = tags.find((tag) => tag.name === match);
        if (existingTag) {
          existingTag.count++;
        } else {
          tags.push({ name: match, count: 1 });
        }
      });
    });
    return tags;
  }
}
