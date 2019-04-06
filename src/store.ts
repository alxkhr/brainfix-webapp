import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { authenticationModule, AuthenticationState } from './authentication/authentication.state';
import { syncModule, SyncState } from './sync/sync.state';

Vue.use(Vuex);

export interface RootState {
  authentication: AuthenticationState;
  sync: SyncState;
}

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    authentication: authenticationModule,
    sync: syncModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
