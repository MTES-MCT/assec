import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import DepartementForm from './../components/forms/DepartementForm';

const Dashboard = ({ config }) => (
  <AppPage {...config}>
    <div id="page-main-column" className="col50">
      <div id="welcom-message" className="mb20">
        <h3>Bienvenue sur votre tableau de bord</h3>
      </div>
      <DepartementForm />
    </div>
    <div id="page-aside-column" className="col50" />
  </AppPage>
);

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Dashboard;
