import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const TextInput = ({
  label, placeholder, name, ...rest
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field {...rest}
        type="text"
        id={name}
        name={name}
        component="input"
        placeholder={placeholder} />
    </label>
  </p>
);

TextInput.defaultProps = {
  placeholder: '',
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default TextInput;