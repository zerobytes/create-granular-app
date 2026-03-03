import { renderToString } from '@granularjs/core';
import { AppLayout } from './layouts/app.layout.js';
import { Home } from './pages/home.page.js';
import { About } from './pages/about.page.js';

const routes = {
  '/': Home,
  '/about': About,
};

export function render(url) {
  const pathname = url.split('?')[0].split('#')[0] || '/';
  const Page = routes[pathname] || Home;
  return renderToString(AppLayout(Page()));
}
