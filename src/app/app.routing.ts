import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from '../util/hot-reload';


import { auth } from '../shared/auth/auth.service'

const homeComponent = () => import('./home').then(({ HomeComponent }) => HomeComponent);
const aboutComponent = () => import('./about').then(({ AboutComponent }) => AboutComponent);
const listComponent = () => import('./list').then(({ ListComponent }) => ListComponent);
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/home').then(({ HomeComponent }) => HomeComponent);
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/about').then(({ AboutComponent }) => AboutComponent);
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/list').then(({ ListComponent }) => ListComponent);

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './home';
  const aboutModuleId = './about';
  const listModuleId = './list';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./home', () => reload(homeModuleId, (<any>require('./home')).HomeComponent)));

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./about', () => reload(aboutModuleId, (<any>require('./about')).AboutComponent)));

  makeHot(listModuleId, listComponent,
    module.hot.accept('./list', () => reload(listModuleId, (<any>require('./list')).ListComponent)));
}

export const createAppRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
    activated:auth.isLogin()
  },
  {
    path: 'about',
    component: aboutComponent,
    activated:auth.isLogin()
  },
  {
    path: 'list',
    component: listComponent,
    activated:auth.isLogin()
  }
];
