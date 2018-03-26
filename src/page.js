import React from 'react';
import Helmet from 'react-helmet';

// application
import debug from './lib/debug';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';

const PageComponent = () => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec{debug() && ' | Development'}</title>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto" />
      <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
    </Helmet>
    <AppHeader />
    {/* routes */}
    <FormScreen />
    <AppFooter version="0.6.0" />
  </div>
);

export default PageComponent;
