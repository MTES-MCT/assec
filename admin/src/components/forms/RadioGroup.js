import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const RadioGroup = ({
  name, label, provider, ...rest
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      {provider &&
        provider.map(() => (
          <Field {...rest} name={name} type="radio" component="input" />
        ))}
    </label>
  </p>
);

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default RadioGroup;
