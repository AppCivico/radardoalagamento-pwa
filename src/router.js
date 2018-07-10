import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Districts from './views/Districts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/districts',
      name: 'Meus distritos',
      component: Districts,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
