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
    alerts: [],
    alertsCity: [],
    oneSignalUserId: String,
    oneSignalUserIsSubscribed: false,
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
    SET_ALERTS_CITY(state, { res }) {
      state.alertsCity = res.results;
    },
    SET_ALERTS(state, { res }) {
      state.alerts = res.results;
    },
    SET_ONESIGNAL_USER_ID(state, oneSignalUserId) {
      state.oneSignalUserId = oneSignalUserId;
    },
    SET_ONESIGNAL_USER_IS_SUBSCRIBED(state, oneSignalUserIsSubscribed) {
      state.oneSignalUserIsSubscribed = oneSignalUserIsSubscribed;
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
    REGISTER_USER({ state, commit }, data) {
      const newData = { ...data };
      newData.push_token = state.oneSignalUserId;
      newData.push_token_status = state.oneSignalUserIsSubscribed;
      return new Promise((resolve, reject) => {
        console.log('test');
        axios({
          method: 'POST',
          url: `${config.api}/signup`,
          headers: { 'Content-Type': 'application/json' },
          data: newData,
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
          url: `${config.api}/district/${payload.id}/${payload.action}?api_key=${state.apikey}`,
          headers: { 'Content-Type': 'application/json' },
        }).then(
          (response) => {
            resolve(response);
            const user = localStorage.getItem('rdalgus');
            if (user) {
              const parsedUser = JSON.parse(user);
              if (payload.action === 'follow') {
                parsedUser.districts.push(payload.id);
              } else if (payload.action === 'unfollow') {
                const index = parsedUser.districts.findIndex(item => item === payload.id);
                parsedUser.districts.splice(index, 1);
              }
              localStorage.setItem('rdalgus', JSON.stringify(parsedUser));
              commit('SET_USER', { res: parsedUser });
            }
          },
          (err) => {
            reject(err);
            console.error('err', err);
          },
        );
      });
    },
    GET_ALERTS_CITY({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.api}/alert/all?api_key=${state.apikey}`).then(
          (response) => {
            commit('SET_ALERTS_CITY', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    GET_ALERTS({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.api}/alert?api_key=${state.apikey}`).then(
          (response) => {
            commit('SET_ALERTS', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    REPORT_PROBLEM({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `${config.api}/app-report`,
          headers: { 'Content-Type': 'application/json' },
          data,
        }).then(
          (response) => {
            resolve(response);
          },
          (err) => {
            reject(err);
            console.error('err', err);
          },
        );
      });
    },
    NEW_ALERT({ state }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `${config.api}/alert?api_key=${state.apikey}`,
          headers: { 'Content-Type': 'application/json' },
          data,
        }).then(
          (response) => {
            resolve(response);
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
