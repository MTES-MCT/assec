import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closePopin } from './../../../actions';

const CancelButton = ({ label, dispatch }) => {
  const bprops = {
    type: 'button',
    className: 'big super',
  };
  return (
    <p className="flex-columns flex-end submit-button">
      <button {...bprops} onClick={() => dispatch(closePopin())}>
        <span>{label}</span>
        <i className="icon icon-cancel" />
      </button>
    </p>
  );
};

CancelButton.defaultProps = {
  label: 'Annuler',
};

CancelButton.propTypes = {
  label: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CancelButton);
