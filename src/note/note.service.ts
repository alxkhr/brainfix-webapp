import { v4 } from 'uuid';

import { Note } from './note.model';

export namespace NoteService {
  export function getEmptyNote(): Note {
    return {
      uuid: v4(),
      content: '',
      dateModified: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      dateSync: '-1',
      synchronized: false,
      deleted: false,
    };
  }
}
