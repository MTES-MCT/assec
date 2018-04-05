import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ label, pristine, invalid }) => (
  <p>
    <button type="submit" className="button-big" disabled={pristine || invalid}>
      <span>{label}</span>
      <i className="icon icon-save" />
    </button>
  </p>
);

SubmitButton.defaultProps = {
  label: 'Enregistrer',
};

SubmitButton.propTypes = {
  label: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default SubmitButton;
