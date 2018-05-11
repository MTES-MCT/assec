import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

// application
import SelectAdapter from './adpaters/Select';

const SelectBox = ({
  name,
  size,
  label,
  inline,
  multiple,
  provider,
  ...rest
}) => (
  <p>
    <label htmlFor={name} className={(inline && 'inline') || ''}>
      <span>{label}</span>
      <span className="selectbox">
        <Field id={name}
          size={size}
          name={name}
          multiple={multiple}
          provider={provider}
          component={SelectAdapter}
          {...rest} />
      </span>
    </label>
  </p>
);

SelectBox.defaultProps = {
  size: 1,
  inline: false,
  multiple: false,
};

SelectBox.propTypes = {
  size: PropTypes.number,
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default SelectBox;
