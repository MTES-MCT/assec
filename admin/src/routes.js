import Dashboard from './pages/Dashboard';
import Contributors from './pages/Contributors';

export const routes = [
  {
    path: '/',
    exact: true,
    icon: 'gauge',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    exact: true,
    icon: 'users',
    path: '/contributors',
    name: 'Contributeurs',
    component: Contributors,
  },
];

export default routes;
