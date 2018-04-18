import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

// application
import { ALL_DEPARTEMENTS } from './../apolloql';
import AppPage from './../components/AppPage';
import NoContent from './../components/ui/NoContent';
import DepartementForm from './departements/DepartementForm';
import DepartementTable from './departements/DepartementTable';

const renderNoContent = () => (
  <div id="page-main-column">
    <NoContent description="Ajouter un département en utilisant le formulaire ci-contre" />
  </div>
);

const DepartementsPage = ({ data, config: { name, ...rest } }) => {
  const hasdepartements = data.departements && data.departements.length > 0;
  return (
    <AppPage name={`Gestion ${name}`} {...rest}>
      <div id="page-main-column" className="col50">
        {hasdepartements && <DepartementTable />}
        {!hasdepartements && renderNoContent()}
      </div>
      <div id="page-aside-column" className="col50">
        <DepartementForm />
      </div>
    </AppPage>
  );
};

DepartementsPage.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default graphql(ALL_DEPARTEMENTS)(DepartementsPage);
