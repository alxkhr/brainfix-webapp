import Dexie from 'dexie';

import { Note } from './note.model';

class NoteDB extends Dexie {
  notes!: Dexie.Table<Note, String>;
  constructor() {
    super('Brainfix');
    this.version(1).stores({
      notes: '&uuid, content',
    });
  }
}

export const db = new NoteDB();
