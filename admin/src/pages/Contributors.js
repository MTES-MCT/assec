import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

// application
import AppPage from './../components/AppPage';
import PersonsTable from './contributors/PersonsTable';

const ContributorsPage = ({ config }) => (
  <AppPage {...config}>
    <Fragment>
      <div id="page-main-column">
        <PersonsTable />
      </div>
    </Fragment>
  </AppPage>
);

ContributorsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ContributorsPage;
