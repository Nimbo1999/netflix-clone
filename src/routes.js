import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/homepage'));
const Page404 = lazy(() => import('./pages/404'));
const MoviePage = lazy(() => import('./pages/movie-page'));
const SearchPage = lazy(() => import('./pages/search-page'));

export default [
  {
    key: 'homepage',
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    key: 'moviepage',
    path: '/movie/:id',
    component: MoviePage,
  },
  {
    key: 'searchpage',
    path: '/search',
    component: SearchPage,
  },
  {
    key: 'notfoundpage',
    path: '*',
    component: Page404,
  },
];
