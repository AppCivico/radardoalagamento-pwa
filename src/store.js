import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zones: [],
    selectedDistricts: [],
    apikey: '',
    user: {},
  },
  mutations: {
    SET_ZONES(state, { res }) {
      state.zones = res.results;
    },
    SET_SELECTED_DISTRICTS(state, { payload }) {
      state.selectedDistricts = payload;
    },
    SET_APIKEY(state, { res }) {
      state.apikey = res;
    },
    SET_USER(state, { res }) {
      state.user = res;
    },
  },
  actions: {
    GET_ZONES({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.api}/zone`).then(
          (response) => {
            commit('SET_ZONES', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    REGISTER_USER({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `${config.api}/signup`,
          headers: { 'Content-Type': 'application/json' },
          data,
        }).then(
          (response) => {
            resolve(response);
            commit('SET_APIKEY', { res: response.data.api_key });
            commit('SET_USER', { res: data });
            localStorage.setItem('rdalgapk', response.data.api_key);
            localStorage.setItem('rdalgus', JSON.stringify(data));
          },
          (err) => {
            reject(err);
            console.error('err', err);
          },
        );
      });
    },
    EDIT_USER({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: `${config.api}/me?api_key=${state.apikey}`,
          headers: { 'Content-Type': 'application/json' },
          data,
        }).then(
          (response) => {
            resolve(response);
            commit('SET_USER', { res: data });
            localStorage.setItem('rdalgus', JSON.stringify(data));
          },
          (err) => {
            reject(err);
            console.error('err', err);
          },
        );
      });
    },
    UPDATE_DISTRICTS({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `https://dtupa.eokoe.com/district/${payload.id}/${payload.action}?api_key=${state.apikey}`,
          headers: { 'Content-Type': 'application/json' },
        }).then(
          (response) => {
            resolve(response);
            console.log('response', response);
            // commit('SET_APIKEY', { res: response.data.api_key });
            // commit('SET_USER', { res: data });
            // localStorage.setItem('rdalgapk', response.data.api_key);
            // localStorage.setItem('rdalgus', JSON.stringify(data));
          },
          (err) => {
            reject(err);
            console.error('err', err);
          },
        );
      });
    },
  },
});
