import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import ContributorForm from './contributors/ContributorForm';
import DepartementForm from './departements/DepartementForm';
import RestrictionsForm from './restrictions/RestrictionsForm';

const Dashboard = ({ config }) => (
  <AppPage {...config}>
    <div id="page-main-column" className="col50">
      <RestrictionsForm />
      <ContributorForm />
    </div>
    <div id="page-aside-column" className="col50">
      <DepartementForm />
    </div>
  </AppPage>
);

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Dashboard;
