import Dashboard from './pages/Dashboard';
import Restrictions from './pages/Restrictions';
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
  {
    exact: true,
    icon: 'alert',
    name: 'Restrictions',
    path: '/restrictions',
    component: Restrictions,
  },
];

export default routes;
