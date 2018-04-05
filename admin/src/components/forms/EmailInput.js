import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const EmailInput = ({ label, name }) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field type="email" id={name} name={name} component="input" />
    </label>
  </p>
);

EmailInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default EmailInput;
