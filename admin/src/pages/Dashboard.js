import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

// application
import AppPage from './../components/AppPage';
import PersonForm from './dashboard/PersonForm';
import DepartementForm from './dashboard/DepartementForm';
import RestrictionsForm from './dashboard/RestrictionsForm';

const Dashboard = ({ config }) => (
  <AppPage {...config}>
    <Fragment>
      <div id="page-main-column">
        <RestrictionsForm />
        <PersonForm />
      </div>
      <div id="page-aside-column">
        <DepartementForm />
      </div>
    </Fragment>
  </AppPage>
);

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Dashboard;
