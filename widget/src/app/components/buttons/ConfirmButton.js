import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepForward } from './../../actions';

const ConfirmButton = ({ dispatch, disabled }) => (
  <button disabled={disabled}
    type="button"
    onClick={() => dispatch(stepForward())}
    className={`next action ${disabled ? 'disabled' : ''}`}>
    <span>Question suivante</span>
    <i className="icon icon-right-open-big" />
  </button>
);

ConfirmButton.defaultProps = {
  disabled: false,
};

ConfirmButton.propTypes = {
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ConfirmButton);
