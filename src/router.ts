import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

import { auth } from './shared/auth/auth.service'

 import { createAppRoutes } from './app/app.routing';
 import { createAccountRoutes } from './account/account.routing';

const appComponent = () => import('../src/app/app.component').then(({ AppComponent }) => AppComponent);
const accountComponent = () => import('../src/account/account.component').then(({ AccountComponent }) => AccountComponent);

if (process.env.ENV === 'development' && module.hot) {
  const appModuleId = '../src/app/app.component';
  const accountModuleId = '../src/account/account';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(appModuleId, appComponent,
    module.hot.accept('../src/app/app.component', () => reload(appModuleId, (<any>require('../src/app/app.component')).AppComponent)));

  makeHot(accountModuleId, accountComponent,
    module.hot.accept('../src/account/account.component', () => reload(accountModuleId, (<any>require('../src/account/account.component')).AccountComponent)));
 
}

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: appComponent,
    children:createAppRoutes(),
    beforeEnter(to,from,next){
      if(!auth.isLogin()){
       next('/account');
      }
      next();
    }
  },
  {
    path: '/account',
    component: accountComponent,
    children:createAccountRoutes(),  
  },
  {
    path:'**',
    redirect:'/'
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
