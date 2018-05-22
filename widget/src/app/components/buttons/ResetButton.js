import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { resetForm } from './../../actions';

const ResetButton = ({ dispatch, reset, disabled }) => (
  <button disabled={disabled}
    type="type"
    onClick={() => {
      reset();
      dispatch(resetForm());
    }}
    className={`action reset mb12 ${disabled ? 'disabled' : ''}`}>
    <i className="icon icon-left-open-big" />
    <span>Recommencer</span>
  </button>
);

ResetButton.defaultProps = {
  disabled: false,
};

ResetButton.propTypes = {
  disabled: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ResetButton);
