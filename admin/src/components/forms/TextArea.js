import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const TextArea = ({
  name, label, large, ...rest
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <Field {...rest}
        id={name}
        name={name}
        component="textarea"
        className={!large ? '' : 'large'} />
    </label>
  </p>
);

TextArea.defaultProps = {
  large: false,
};

TextArea.propTypes = {
  large: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextArea;
