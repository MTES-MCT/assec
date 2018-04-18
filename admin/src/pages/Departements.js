import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import DepartementForm from './departements/DepartementForm';
import DepartementTable from './departements/DepartementTable';

const DepartementsPage = ({ config: { name, ...rest } }) => (
  <AppPage name={`Gestion ${name}`} {...rest}>
    <div id="page-main-column" className="col50">
      <DepartementTable />
    </div>
    <div id="page-aside-column" className="col50">
      <DepartementForm />
    </div>
  </AppPage>
);

DepartementsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DepartementsPage;
