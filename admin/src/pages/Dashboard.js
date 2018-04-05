import React from 'react';
import PropTypes from 'prop-types';

// application
import PersonForm from './dashboard/PersonForm';
import PageTitle from './../components/ui/PageTitle';
import DepartementForm from './dashboard/DepartementForm';
import RestrictionsForm from './dashboard/RestrictionsForm';

const Dashboard = ({ name, icon }) => (
  <div id="dashboard-page" className="page-content">
    <PageTitle label={name} icon={icon} />
    <div className="flex-columns">
      <div id="page-main-column">
        <RestrictionsForm />
        <PersonForm />
      </div>
      <div id="page-aside-column">
        <DepartementForm />
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Dashboard;
