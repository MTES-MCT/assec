import React from 'react';
import PropTypes from 'prop-types';

const CancelButton = ({ label, disabled, onClick }) => {
  const props = {
    type: (onClick && 'button') || 'reset',
  };
  if (onClick) props.onClick = onClick;
  return (
    <button className="big danger cancel-button" disabled={disabled} {...props}>
      <span>{label || 'Annuler'}</span>
      <i className="icon icon-cancel" />
    </button>
  );
};

CancelButton.defaultProps = {
  label: null,
  onClick: null,
};

CancelButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

export default CancelButton;
