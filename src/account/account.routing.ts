import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from '../util/hot-reload';
import { auth } from '../shared/auth/auth.service'

const loginComponent = () => import('./login').then(({ loginComponent }) => loginComponent);

// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/home').then(({ HomeComponent }) => HomeComponent);
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/about').then(({ AboutComponent }) => AboutComponent);
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/list').then(({ ListComponent }) => ListComponent);

if (process.env.ENV === 'development' && module.hot) {
  const loginModuleId = './login';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(loginModuleId, loginComponent,
    module.hot.accept('./login', () => reload(loginModuleId, (<any>require('./login')).loginComponent)));

}

// Vue.use(VueRouter);

export const createAccountRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: loginComponent
  } 
];

// export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
