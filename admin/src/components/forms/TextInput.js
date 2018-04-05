import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const TextInput = ({ label, name, ...rest }) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field {...rest} type="text" id={name} name={name} component="input" />
    </label>
  </p>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default TextInput;
