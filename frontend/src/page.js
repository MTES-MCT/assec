import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { usedebug } from './core/utils';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';

const PageComponent = ({ activestep }) => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <body className={`current-step-${activestep}`} />
      <title>Assec{usedebug() ? ' | Development' : ''}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
        rel="stylesheet" />
    </Helmet>
    <AppHeader title="ASSEC"
      subtitle="Accédez aux règles d’utilisation de l’eau en période de sécheresse en 3 clics" />
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
