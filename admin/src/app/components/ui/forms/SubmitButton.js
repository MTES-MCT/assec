import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({
  label, pristine, invalid, submit,
}) => {
  const bprops = {
    className: 'big super',
    disabled: pristine || invalid,
    type: (submit && 'button') || 'submit',
  };
  if (submit) bprops.onClick = submit;
  return (
    <p className="flex-columns flex-end submit-button">
      <button {...bprops}>
        <span>{label}</span>
        <i className="icon icon-floppy" />
      </button>
    </p>
  );
};

SubmitButton.defaultProps = {
  submit: null,
  label: 'Enregistrer',
};

SubmitButton.propTypes = {
  submit: PropTypes.func,
  label: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default SubmitButton;
