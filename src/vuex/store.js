import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const CURRENT_USER = 'CURRENT_USER';
const LOGOUT = 'LOGOUT';
const FETCH_USER_OS = 'FETCH_USER_OS'
const isProd = process.env.NODE_ENV === 'production';
axios.defaults.baseURL = isProd ? 'https://dtalks-api.herokuapp.com/v1' : 'http://localhost:3000/v1';

export const store = new Vuex.Store({
    state: {
      authHeaders: {},
      currentUser: {},
      userOS: ''
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
      },
      [FETCH_USER_OS](state) {
        let OSName = '';
        if(navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if(navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        if(navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        if(navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

        state.userOS = OSName;
      }
    },
    getters: {
      authHeaders(state) {
        return state.authHeaders;
      },
      currentUser(state) {
        return state.currentUser;
      },
      userOS(state) {
        return state.userOS;
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
