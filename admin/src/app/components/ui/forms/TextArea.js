import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const TextArea = ({
  name, label, large, inline, ...rest
}) => (
  <p>
    <label htmlFor={name} className={inline ? 'inline' : ''}>
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
  inline: false,
};

TextArea.propTypes = {
  large: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextArea;
