import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

// application
import AppPage from './../components/AppPage';
import RestrictionsTable from './restrictions/RestrictionsTable';

const RestrictionsPage = ({ config }) => (
  <AppPage {...config}>
    <Fragment>
      <div id="page-main-column">
        <RestrictionsTable />
      </div>
    </Fragment>
  </AppPage>
);

RestrictionsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default RestrictionsPage;
