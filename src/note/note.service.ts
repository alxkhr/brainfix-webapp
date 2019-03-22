import { db } from './note-db';
import { Note } from './note.model';

export namespace NoteService {
  export function deleteNote(uuid: string): void {
    db.notes.delete(uuid);
  }
  export function putNote(note: Note): void {
    db.notes.put(note);
  }
  export async function getNotes(): Promise<Note[]> {
    return db.notes.toArray();
  }
  export async function getNote(uuid: string): Promise<Note | undefined> {
    return db.notes.get(uuid);
  }
}
