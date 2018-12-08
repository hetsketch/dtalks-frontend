import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';
import locale from './locale'
import axios from 'axios'
import Buefy from 'buefy'
import moment from 'moment'
import YmapPlugin from 'vue-yandex-maps'
import lodash from 'lodash'
import { store } from './vuex/store'
import Croppa from 'vue-croppa'
import infiniteScroll from 'vue-infinite-scroll'
import autosize from 'autosize';
import ActionCable from 'actioncable-modules';

let webSocketProtocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
let socketHost = process.env.NODE_ENV === 'production' ? process.env.SOCKET_HOST : 'localhost';
let socketPort = process.env.NODE_ENV === 'production' ? process.env.SOCKET_PORT : 3000;
const cable = ActionCable.createConsumer(`${webSocketProtocol}://${socketHost}:${socketPort}/cable`);

import App from './App'
import router from './router'

Validator.localize('ru', locale);
Vue.use(VeeValidate);

//add buefy
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultContentElement: '#content'
});

const isProd = process.env.NODE_ENV === 'production';
//add axios as default $http vue method
axios.defaults.baseURL = isProd ? 'https://dtalks-api.herokuapp.com/v1' : 'http://localhost:3000/v1';
Vue.prototype.$http = axios;

//momentjs configuration
moment.locale('ru');
moment.updateLocale('ru', {
  monthsShort: {
    format: 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_'),
    standalone: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_')
  }
});
Vue.prototype.moment = moment;

//actioncable
Vue.prototype.$cable = cable;

//lodash
Vue.prototype.$_ = lodash;

//yandex maps
Vue.use(YmapPlugin);

//image cropper
Vue.use(Croppa);

//load on scroll
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

//directives
Vue.directive('autosize', {
  inserted(el) {
    autosize(el.getElementsByClassName('textarea')[0]);
  }
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
});
