import React from 'react';

// application
import PersonForm from './contributors/PersonForm';
import PersonsTable from './contributors/PersonsTable';

const ContributorsPage = () => (
  <div id="contributors-page" className="flex-rows">
    <PersonForm />
    <PersonsTable />
  </div>
);

ContributorsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default ContributorsPage;
