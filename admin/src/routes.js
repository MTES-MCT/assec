import Zones from './pages/Zones';
import Dashboard from './pages/Dashboard';
import MySettings from './pages/MySettings';
import Departements from './pages/Departements';
import Restrictions from './pages/Restrictions';
// import Contributors from './pages/Contributors';

export const routes = {
  main: [
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
      icon: 'database',
      path: '/departements',
      name: 'Départements',
      component: Departements,
    },
    {
      exact: false,
      icon: 'map',
      path: '/zones',
      name: 'Mes Zones',
      component: Zones,
    },
    // {
    //   exact: false,
    //   icon: 'users',
    //   path: '/contributors',
    //   name: 'Contributeurs',
    //   component: Contributors,
    // },
  ],
  sub: [
    {
      exact: false,
      icon: 'cog',
      path: '/mysettings',
      name: 'Mon Compte',
      component: MySettings,
    },
  ],
};

export default routes;
