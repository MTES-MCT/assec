import Dashboard from './pages/Dashboard';
import Departements from './pages/Departements';
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
    icon: 'attention',
    name: 'Restrictions',
    path: '/restrictions',
    component: Restrictions,
  },
  {
    exact: false,
    icon: 'globe',
    path: '/departements',
    name: 'Départements',
    component: Departements,
  },
  {
    exact: false,
    icon: 'users',
    path: '/contributors',
    name: 'Contributeurs',
    component: Contributors,
  },
];

export default routes;
