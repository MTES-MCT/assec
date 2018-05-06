import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { subClosed } from './../actions';

const Toaster = ({ message, type }) => (
  <div id="toaster" className={`${type && `toaster-${type}`}`}>
    <div className="relative">
      {message && (
        <span>
          <b>{message}</b>
        </span>
      )}
      {/* <button onClick={() => dispatch(subClosed())}>
        <i className="icon icon-cancel" />
      </button> */}
    </div>
  </div>
);

Toaster.defaultProps = {
  type: null,
  message: null,
};

Toaster.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default connect(({ subscriptionStatus }) => ({
  type: (subscriptionStatus && subscriptionStatus.type) || null,
  message: (subscriptionStatus && subscriptionStatus.message) || null,
}))(Toaster);
