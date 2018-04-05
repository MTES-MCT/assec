import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

// application
import AppPage from './../components/AppPage';
import DepartementForm from './departements/DepartementForm';

const DepartementsPage = ({ config }) => (
  <AppPage {...config}>
    <Fragment>
      <div id="page-main-column">
        <DepartementForm />
      </div>
    </Fragment>
  </AppPage>
);

DepartementsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DepartementsPage;
