import React from 'react';
import Helmet from 'react-helmet';
import { debug } from 'assec-utils';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AdminPage from './components/pages/AdminPage';
import MainNavigation from './components/navs/MainNavigation';

const PageComponent = () => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec Backoffice{debug() ? ' | Development' : ''}</title>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto" />
    </Helmet>
    <MainNavigation />
    <AppHeader />
    {/* routes */}
    <AdminPage />
    {/* routes */}
    <AppFooter version="0.6.0" />
  </div>
);

export default PageComponent;
