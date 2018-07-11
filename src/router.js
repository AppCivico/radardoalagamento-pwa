import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Districts from './views/Districts.vue';
import Profile from './views/Profile.vue';
import Alerts from './views/Alerts.vue';

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
    {
      path: '/districts',
      name: 'Meus distritos',
      component: Districts,
    },
    {
      path: '/profile',
      name: 'Perfil',
      component: Profile,
    },
    {
      path: '/alerts',
      name: 'Alertas',
      component: Alerts,
    },
    {
      path: '/options',
      name: 'Configurações',
      component: () => import('./views/Options.vue'),
    },
    {
      path: '/terms',
      name: 'Termos de Serviço',
      component: () => import('./views/Terms.vue'),
    },
    {
      path: '/privacy',
      name: 'Política de privacidade',
      component: () => import('./views/Privacy.vue'),
    },
    {
      path: '/help',
      name: 'Ajuda',
      component: () => import('./views/Help.vue'),
    },
    {
      path: '/new-alert',
      name: 'Novo alerta',
      component: () => import('./views/NewAlert.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
