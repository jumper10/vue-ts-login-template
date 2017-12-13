import Vue from 'vue';
import VueRouter from 'vue-router';
import { makeHot, reload } from './util/hot-reload';
import { createRouter } from './router';

// const navbarComponent = () => import('./app/navbar').then(({ NavbarComponent }) => NavbarComponent);
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar').then(({ NavbarComponent }) => NavbarComponent);

import './sass/main.scss';
import { Component } from 'vue-property-decorator';

if (process.env.ENV === 'development' && module.hot) {
  // const navbarModuleId = '../src/app/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  // makeHot(navbarModuleId, navbarComponent,
   // module.hot.accept('../src/app/navbar', () => reload(navbarModuleId, (<any>require('./components/navbar')).NavbarComponent)));
}

let router = createRouter();

new Vue({
  el: '#app-main',
  router: router
});
