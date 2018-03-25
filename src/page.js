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
    </Helmet>
    <AppHeader />
    {/* routes */}
    <FormScreen />
    <AppFooter />
  </div>
);

export default PageComponent;
