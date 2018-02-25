import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const CURRENT_USER = 'CURRENT_USER';
const LOGOUT = 'LOGOUT';
axios.defaults.baseURL = 'http://localhost:3000/v1';

export const store = new Vuex.Store({
    state: {
      authHeaders: {},
      currentUser: {}
    },
    plugins: [createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      }
    })],
    mutations: {
      [AUTHENTICATE_USER](state, payload) {
        const headers = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

        headers.forEach(h => {
          state.authHeaders[h] = payload[h];
        });
      },
      [CURRENT_USER](state, payload) {
        state.currentUser = payload;
      },
      [LOGOUT](state) {
        state.currentUser = {};
        state.authHeaders = {};
      }
    },
    getters: {
      authHeaders(state) {
        return state.authHeaders;
      },
      currentUser(state) {
        return state.currentUser;
      }
    },
    actions: {
      signin({ commit }, credentials) {
        axios.post('/auth/sign_in', credentials)
          .then(response => {
            commit(AUTHENTICATE_USER, response.headers);
            commit(CURRENT_USER, response.data.data);
          })
          .catch(response => {
            console.log('auth error');
            console.log(response.errors);
          });
      },
      validateToken({ commit, state, getters }) {
        axios.get('/auth/validate_token', { headers: state.authHeaders })
          .then(response => {
            commit(CURRENT_USER, response.data.data);
          })
          .catch(response => {
            console.log('error in `validate token` method');
          })
      },
      logout({ commit, state }) {
        axios.delete('/auth/sign_out', { headers: state.authHeaders })
          .then(response => {
            commit(LOGOUT);
            console.log('you has successfully logged out');
          })
          .catch(response => {
            console.log('error in logout');
          })
      }
    }
  })
;
