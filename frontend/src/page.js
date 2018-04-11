import React from 'react';
import Helmet from 'react-helmet';

// application
import { debug } from './utils';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';

const PageComponent = () => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec{debug() ? ' | Development' : ''}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
        rel="stylesheet" />
    </Helmet>
    <AppHeader />
    {/* routes */}
    <FormScreen />
    {/* routes */}
    <AppFooter />
  </div>
);

export default PageComponent;
