import Dashboard from './pages/Dashboard';
import Restrictions from './pages/Restrictions';
import Contributors from './pages/Contributors';

export const routes = [
  {
    path: '/',
    exact: true,
    icon: 'gauge',
    name: 'Tableau de bord',
    component: Dashboard,
  },
  {
    exact: false,
    icon: 'users',
    path: '/contributors',
    name: 'Contributeurs',
    component: Contributors,
  },
  {
    exact: false,
    icon: 'attention',
    name: 'Restrictions',
    path: '/restrictions',
    component: Restrictions,
  },
];

export default routes;
