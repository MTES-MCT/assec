import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ disabled }) => (
  <button disabled={disabled}
    type="submit"
    className={`next action ${disabled ? 'disabled' : ''}`}>
    <span>Voir les résultats</span>
    <i className="icon icon-right-open-big" />
  </button>
);

SubmitButton.defaultProps = {
  disabled: false,
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
};

export default SubmitButton;
