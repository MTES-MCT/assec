import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Field } from 'react-final-form';

const EmailInput = ({ showtooltip, errmessage, disabled }) => (
  <div id="alert-input" className="flex-columns">
    <Tooltip arrow
      hideOnClick
      position="top"
      trigger="keyup"
      arrowSize="small"
      open={showtooltip}
      title={errmessage}
      disabled={!showtooltip}>
      <Field className="field flex-2 py12 px20"
        id="email"
        type="email"
        name="email"
        component="input"
        disabled={disabled}
        placeholder="Votre email" />
    </Tooltip>
    <button className="align-center py12 px12 pl20"
      type="submit"
      disabled={disabled}>
      <span>
        {disabled && <i className="animate-spin icon-spin6" />}
        {!disabled && <span>Rester informé</span>}
      </span>
    </button>
  </div>
);

EmailInput.defaultProps = {
  errmessage: 'Veuillez saisir une adresse email valide.',
};

EmailInput.propTypes = {
  errmessage: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  showtooltip: PropTypes.bool.isRequired,
};

export default EmailInput;
