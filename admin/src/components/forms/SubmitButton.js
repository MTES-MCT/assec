import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ pristine, invalid }) => (
  <p>
    <button type="submit" className="button-big" disabled={pristine || invalid}>
      <span>Enregistrer</span>
      <i className="icon icon-save" />
    </button>
  </p>
);

SubmitButton.propTypes = {
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default SubmitButton;
