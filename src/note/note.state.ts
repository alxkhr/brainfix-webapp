import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import { RootState } from '../store';
import { SynchronizeActionPayload } from '../sync/sync.state';
import { TagService } from '../tag/tag.service';
import { db } from './note.db';
import { Note } from './note.model';

type MinimalNotePartial = Partial<Note> & { uuid: string };

export interface NoteState {
  notes: Note[];
}

export interface DeleteNoteActionPayload {
  uuid: string;
}

export interface UpdateNoteActionPayload {
  notePartial: MinimalNotePartial;
}

export interface CreateNoteActionPayload {
  note: Note;
}

const state: NoteState = {
  notes: [],
};

const actions: ActionTree<NoteState, RootState> = {
  async loadNotes({ commit }) {
    const notes = await db.notes.toArray();
    commit('notesLoaded', notes);
  },

  async deleteNote({ commit, getters }, { uuid }: DeleteNoteActionPayload) {
    commit('noteUpdated', { uuid, synchronized: false, deleted: true });
    const affected: Note | null = getters.getNoteByUuid(uuid);
    if (affected) {
      await db.notes.put(affected);
    }
  },

  async updateNote({ commit, getters }, { notePartial }: UpdateNoteActionPayload) {
    commit('noteUpdated', { ...notePartial, synchronized: false });
    const affected: Note | null = getters.getNoteByUuid(notePartial.uuid);
    if (affected) {
      await db.notes.put(affected);
    }
  },

  async createNote({ commit }, { note }: CreateNoteActionPayload) {
    commit('noteCreated', { ...note, synchronized: false });
    await db.notes.put(note);
  },

  startPollingNotes({ rootState, dispatch, commit, getters, state }) {
    setInterval(async () => {
      if (!rootState.authentication.token) {
        throw new Error("Can't sync without token.");
      }
      const synchronizedNotes: Note[] = await dispatch('synchronize', {
        resourceName: 'notes',
        currentState: state.notes.filter((note) => !note.synchronized),
        lastSync: getters.lastSync,
      } as SynchronizeActionPayload);
      commit('notesSynchronized', synchronizedNotes);
      await Promise.all(synchronizedNotes.map((note) => db.notes.put(note)));
    }, 10000);
  },
};

const mutations: MutationTree<NoteState> = {
  notesLoaded(state, notes: Note[]) {
    state.notes = notes;
  },

  notesSynchronized(state, notes: Note[]) {
    notes.forEach((synchronizedNote) => {
      const affected = state.notes.find((note) => note.uuid === synchronizedNote.uuid);
      if (affected) {
        Object.assign(affected, synchronizedNote);
      } else {
        state.notes.push(synchronizedNote);
      }
    });
  },

  noteUpdated(state, notePartial: MinimalNotePartial) {
    const affected = state.notes.find((note) => note.uuid === notePartial.uuid);
    if (affected) {
      Object.assign(affected, notePartial);
    }
  },

  noteCreated(state, note: Note) {
    state.notes.push(note);
  },
};

const getters: GetterTree<NoteState, RootState> = {
  lastSync: (state) =>
    state.notes
      .map(({ dateSync }) => dateSync)
      .sort()
      .pop() || '0',
  getNoteByUuid: (state) => (uuid: string) => state.notes.find((note) => note.uuid === uuid),
  getNotes: (state) =>
    state.notes
      .filter((note) => !note.deleted)
      .sort((a, b) => {
        if (a.dateModified > b.dateModified) {
          return 1;
        }
        if (a.dateModified < b.dateModified) {
          return -1;
        }
        return 0;
      }),
  searchTags: (state) => (query: string) => {
    return TagService.getTagsInNotes(state.notes.filter((note) => !note.deleted))
      .filter((tag) => tag.name.startsWith(query))
      .sort((a, b) => (a.count > b.count ? 1 : -1));
  },
};

export const noteModule: Module<NoteState, RootState> = {
  state,
  actions,
  getters,
  mutations,
};
