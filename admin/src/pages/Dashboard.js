import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import DepartementForm from './departements/DepartementForm';

const Dashboard = ({ config }) => (
  <AppPage {...config}>
    <div id="page-main-column" className="col50">
      <DepartementForm />
    </div>
    <div id="page-aside-column" className="col50" />
  </AppPage>
);

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Dashboard;
