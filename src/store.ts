import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { authenticationModule, AuthenticationState } from './authentication/authentication.state';
import { noteModule, NoteState } from './note/note.state';
import { syncModule, SyncState } from './sync/sync.state';

Vue.use(Vuex);

export interface RootState {
  authentication: AuthenticationState;
  sync: SyncState;
  note: NoteState;
}

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<RootState>({
  modules: {
    authentication: authenticationModule,
    sync: syncModule,
    note: noteModule,
  },
  actions: {
    async loadInitialState({ dispatch }) {
      await dispatch('loadNotes');
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
