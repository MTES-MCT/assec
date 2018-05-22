import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepBackward } from './../../actions';

const PreviousButton = ({ dispatch, disabled }) => (
  <button disabled={disabled}
    type="button"
    onClick={() => dispatch(stepBackward())}
    className={`previous small mb12 ${disabled ? 'disabled' : ''}`}>
    <i className="icon icon-left-open-big" />
    <span>Question précédente</span>
  </button>
);

PreviousButton.defaultProps = {
  disabled: false,
};

PreviousButton.propTypes = {
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PreviousButton);
