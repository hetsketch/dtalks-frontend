import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './routes';
import { store } from '../vuex/store'
import _ from 'lodash';

Vue.use(Router);

const router = new Router({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) && _.isEmpty(store.getters.currentUser)) {
      store.commit('TOGGLE_LOGIN_MODAL');
    } else {
      next();
    }
  }
);

export default router;
