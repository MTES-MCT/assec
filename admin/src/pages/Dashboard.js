import React from 'react';
import PropTypes from 'prop-types';

// application
// import ColorPickerInput from './../components/colorpicker/ColorPickerInput';
import PersonForm from './dashboard/PersonForm';
import PageTitle from './../components/ui/PageTitle';
import DepartementForm from './dashboard/DepartementForm';

const Dashboard = ({ name, icon }) => (
  <div id="dashboard-page" className="page-content">
    <PageTitle label={name} icon={icon} />
    <DepartementForm />
    <PersonForm />
  </div>
);

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Dashboard;
