import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const InputText = ({ label, name }) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field type="text" id={name} name={name} component="input" />
    </label>
  </p>
);

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default InputText;
