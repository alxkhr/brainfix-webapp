import { ActionTree, Module, MutationTree } from 'vuex';

import { RootState } from '../store';

export interface AuthenticationState {
  token?: string;
}

export interface LoginActionPayload {
  username: string;
  password: string;
}

export interface RegisterActionPayload {
  username: string;
  password: string;
}

const state: AuthenticationState = {
  token: localStorage.getItem('token') || undefined,
};

const actions: ActionTree<AuthenticationState, RootState> = {
  async login({ rootState, commit }, { username, password }: LoginActionPayload) {
    const response = await fetch(`${rootState.sync.serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Connection failed.');
    }
    const token = await response.text();
    if (!token) {
      throw new Error('Connection failed.');
    }
    localStorage.setItem('token', token);
    commit('tokenReceived', token);
  },

  async register({ rootState, commit }, { username, password }: RegisterActionPayload) {
    const response = await fetch(`${rootState.sync.serverUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Connection failed.');
    }
    const token = await response.text();
    if (!token) {
      throw new Error('Connection failed.');
    }
    localStorage.setItem('token', token);
    commit('tokenReceived', token);
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('tokenRemoved');
  },
};

const mutations: MutationTree<AuthenticationState> = {
  tokenReceived(state, token: string) {
    state.token = token;
  },
  tokenRemoved(state) {
    state.token = undefined;
  },
};

export const authenticationModule: Module<AuthenticationState, RootState> = {
  state,
  actions,
  mutations,
};
