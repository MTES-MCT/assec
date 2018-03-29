import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { debug } from 'assec-utils';
import { withRouter } from 'react-router';

// application
import Dashboard from './pages/Dashboard';

// components
import MainNavigation from './components/navs/MainNavigation';

const PageComponent = ({ location }) => (
  <div id="app-container" className="flex-columns">
    <Helmet>
      <title>Assec Backoffice{debug() ? ' | Development' : ''}</title>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto" />
    </Helmet>
    <MainNavigation path={location.pathname} />
    <div id="page-container" className="flex1">
      {/* routes */}
      <Dashboard />
      {/* routes */}
    </div>
  </div>
);

PageComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(PageComponent);
