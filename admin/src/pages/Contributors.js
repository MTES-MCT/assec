import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import PersonsTable from './contributors/PersonsTable';
import ContributorForm from './contributors/ContributorForm';

const ContributorsPage = ({ config }) => (
  <AppPage {...config}>
    <div id="page-main-column">
      <PersonsTable />
    </div>
    <div id="page-aside-column">
      <ContributorForm />
    </div>
  </AppPage>
);

ContributorsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ContributorsPage;
