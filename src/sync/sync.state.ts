import { ActionTree, Module, MutationTree } from 'vuex';

import { RootState } from '../store';

export interface SyncState {
  serverUrl: string;
}

export interface SetServerUrlActionPayload {
  serverUrl: string;
}

export interface SynchronizeActionPayload {
  resourceName: string;
  currentState: any;
  lastSync: string;
}

const state: SyncState = {
  serverUrl: localStorage.getItem('serverUrl') || 'https://brainfix.retterdesapok.de/api',
};

const actions: ActionTree<SyncState, RootState> = {
  async synchronize(
    { rootState, state },
    { resourceName, currentState, lastSync }: SynchronizeActionPayload,
  ): Promise<any> {
    const { token } = rootState.authentication;
    if (!token) {
      throw new Error("Can't sync without token.");
    }
    const response = await fetch(`${state.serverUrl}/${resourceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ lastSync, [resourceName]: currentState }),
    });
    if (!response.ok) {
      throw new Error('Connection failed.');
    }
    const json = await response.json();
    if (!json || !json[resourceName]) {
      throw new Error('Server broken.');
    }
    return json[resourceName];
  },

  setServerUrl({ commit }, { serverUrl }: SetServerUrlActionPayload) {
    localStorage.setItem('serverUrl', serverUrl);
    commit('serverUrlSet', serverUrl);
  },
};

const mutations: MutationTree<SyncState> = {
  serverUrlSet(state, serverUrl: string) {
    state.serverUrl = serverUrl;
  },
};

export const syncModule: Module<SyncState, RootState> = {
  state,
  actions,
  mutations,
};
