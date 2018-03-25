import React from 'react';
import Helmet from 'react-helmet';

// application
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';
// import AppForm from './components/form/AppForm';
// import AppResults from './components/mockup/AppResults';
// import AppSidebar from './components/mockup/AppSidebar';
// import StepperProgress from './components/mockup/stepper/StepperProgress';

const PageComponent = () => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec</title>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto" />
      <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
    </Helmet>
    <AppHeader />
    {/* routes */}
    <FormScreen />
    <AppFooter version="0.5.0" />
  </div>
);

export default PageComponent;
