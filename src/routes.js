import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/homepage'));
const Page404 = lazy(() => import('./pages/404'));

export default [
  {
    key: 'homepage',
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    key: 'notfoundpage',
    path: '*',
    component: Page404,
  },
];
