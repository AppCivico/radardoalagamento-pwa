import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zones: [],
    selectedDistricts: [],
  },
  mutations: {
    SET_ZONES(state, { res }) {
      state.zones = res.results;
    },
    SET_SELECTED_DISTRICTS(state, { payload }) {
      console.log('pay', payload);
      state.selectedDistricts = payload;
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
  },
});
