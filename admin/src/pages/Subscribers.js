import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import SubscriberTable from './subscribers/SubscriberTable';

const Subscribers = ({ config }) => (
  <AppPage {...config}>
    <div id="page-main-column" className="col100">
      <SubscriberTable />
    </div>
  </AppPage>
);

Subscribers.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Subscribers;
