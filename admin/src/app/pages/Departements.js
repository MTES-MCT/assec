import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import DepartementForm from './../components/forms/DepartementForm';
import DepartementTable from './../components/tables/DepartementTable';

const DepartementsPage = ({ config: { name, ...rest } }) => (
  <AppPage name={`Gestion des ${name}`} {...rest}>
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
