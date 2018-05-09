import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import BlockForm from './../components/forms/BlockForm';
import DepartementForm from './../components/forms/DepartementForm';

const Dashboard = ({ config }) => (
  <AppPage {...config}
    header={() => (
      <div id="welcome-message" className="mb20">
        <h3>Bienvenue sur votre tableau de bord</h3>
      </div>
    )}>
    <div id="page-main-column" className="col50">
      <DepartementForm />
    </div>
    <div id="page-aside-column" className="col50">
      <BlockForm />
    </div>
  </AppPage>
);

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Dashboard;
