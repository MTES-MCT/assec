import React from 'react';

// application
import PersonsTable from './contributors/PersonsTable';

const ContributorsPage = () => (
  <div id="contributors-page" className="page-content flex-columns">
    <PersonsTable />
  </div>
);

export default ContributorsPage;
