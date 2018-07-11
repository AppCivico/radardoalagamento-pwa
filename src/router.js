import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Districts from './views/Districts.vue';
import Profile from './views/Profile.vue';
import Alerts from './views/Alerts.vue';
import Options from './views/Options.vue';
import Terms from './views/Terms.vue';
import Privacy from './views/Privacy.vue';
import Help from './views/Help.vue';
import NewAlert from './views/NewAlert.vue';

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
      component: Options,
    },
    {
      path: '/terms',
      name: 'Termos de Serviço',
      component: Terms,
    },
    {
      path: '/privacy',
      name: 'Política de privacidade',
      component: Privacy,
    },
    {
      path: '/help',
      name: 'Ajuda',
      component: Help,
    },
    {
      path: '/new-alert',
      name: 'Novo alerta',
      component: NewAlert,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
