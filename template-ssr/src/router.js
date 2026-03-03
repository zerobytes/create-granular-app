import { createRouter } from '@granularjs/core';
import { AppLayout } from './layouts/app.layout.js';
import { Home } from './pages/home.page.js';
import { About } from './pages/about.page.js';

export const router = createRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      layout: AppLayout,
      children: [
        { path: '', page: Home },
        { path: 'about', page: About },
      ],
    },
  ],
});
