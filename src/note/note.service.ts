import { v4 } from 'uuid';

import { db } from './note-db';
import { Note } from './note.model';

export namespace NoteService {
  export function getNewNote(): Note {
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
  export function deleteNote(note: Note): void {
    db.notes.put({ ...note, synchronized: false, deleted: true });
  }
  export function putNote(note: Note): void {
    db.notes.put({ ...note, synchronized: false });
  }
  export async function getNotes(): Promise<Note[]> {
    return db.notes.toArray();
  }
  export async function getNote(uuid: string): Promise<Note | undefined> {
    return db.notes.get(uuid);
  }
  export function startPolling(): void {
    // setInterval(async () => {
    //   if (!ConfigService.getToken()) {
    //     return;
    //   }
    //   const notes = await db.notes.toArray();
    //   const lastSync =
    //     notes
    //       .map(({ dateSync }) => dateSync)
    //       .sort()
    //       .pop() || '0';
    //   const synchronizedNotes = await SyncService.synchronize<Note[]>(
    //     'notes',
    //     'notes',
    //     notes.filter((note) => !note.synchronized),
    //     lastSync,
    //   );
    //   console.log(synchronizedNotes);
    // }, 10000);
  }
}
