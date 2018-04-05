import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import RestrictionsTable from './restrictions/RestrictionsTable';

const RestrictionsPage = ({ config }) => (
  <AppPage {...config}>
    <div id="page-column-header" className="col100" />
    <div id="page-main-column" className="col50">
      <RestrictionsTable />
    </div>
    <div id="page-aside-column" className="col50" />
  </AppPage>
);

RestrictionsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default RestrictionsPage;
