import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ label, disabled, onClick }) => {
  const props = {
    type: (onClick && 'button') || 'submit',
  };
  if (onClick) props.onClick = onClick;
  return (
    <button className="big super submit-button" disabled={disabled} {...props}>
      <span>{label || 'Enregistrer'}</span>
      <i className="icon icon-floppy" />
    </button>
  );
};

SubmitButton.defaultProps = {
  label: null,
  onClick: null,
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

export default SubmitButton;
