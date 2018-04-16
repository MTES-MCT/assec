import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { debug } from './core/utils';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';

const PageComponent = ({ activestep }) => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <body className={`current-step-${activestep}`} />
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

PageComponent.propTypes = {
  activestep: PropTypes.number.isRequired,
};

export default connect(({ stepper: { activestep } }) => ({ activestep }))(PageComponent);
