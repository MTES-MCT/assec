import Zones from './pages/Zones';
import Blocks from './pages/Blocks';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import MySettings from './pages/MySettings';
import Subscribers from './pages/Subscribers';
import Departements from './pages/Departements';
import Restrictions from './pages/Restrictions';

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
      icon: 'map',
      path: '/zones',
      name: 'Zones',
      component: Zones,
    },
    {
      exact: false,
      icon: 'help',
      path: '/questions',
      name: 'Questions',
      component: Questions,
    },
    {
      exact: false,
      icon: 'database',
      path: '/departements',
      name: 'Départements',
      component: Departements,
    },
  ],
  sub: [
    {
      exact: false,
      icon: 'feather',
      path: '/blocks',
      name: 'Blocks CMS',
      component: Blocks,
    },
    {
      exact: false,
      icon: 'mail',
      path: '/subscribers',
      name: 'Inscrits',
      component: Subscribers,
    },
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
