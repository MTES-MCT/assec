import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepForward } from './../../actions';

const ConfirmButton = ({ dispatch }) => (
  <button type="button"
    className="next action"
    onClick={() => dispatch(stepForward())}>
    <span>Question Suivante</span>
    <i className="icon icon-right-open-big" />
  </button>
);

ConfirmButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ConfirmButton);
