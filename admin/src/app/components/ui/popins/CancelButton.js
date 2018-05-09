import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closePopin } from './../../../actions';

const CancelButton = ({ disabled, label, dispatch }) => {
  const bprops = {
    disabled,
    type: 'button',
    className: 'big danger',
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
  disabled: false,
  label: 'Annuler',
};

CancelButton.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CancelButton);
