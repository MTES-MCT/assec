import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppToaster = ({ message, type }) =>
  type && (
    <div id="application-toaster" className={`toaster-${type}`}>
      <span>
        <b>{message}</b>
      </span>
    </div>
  );

AppToaster.propTypes = {
  type: null,
  message: null,
};

AppToaster.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default connect(({ subscriptionStatus }) => ({
  type: (subscriptionStatus && subscriptionStatus.type) || null,
  message: (subscriptionStatus && subscriptionStatus.message) || null,
}))(AppToaster);
