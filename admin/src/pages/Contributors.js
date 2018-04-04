import React from 'react';

// application
import PersonForm from './contributors/PersonForm';
import PersonsTable from './contributors/PersonsTable';

const ContributorsPage = () => (
  <div id="contributors-page" className="page-content flex-rows">
    <PersonForm />
    <PersonsTable />
  </div>
);

export default ContributorsPage;
