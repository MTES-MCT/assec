import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const renderOption = obj => (
  <option key={obj.id} value={obj.value}>
    {obj.name}
  </option>
);

// application
const SelectBox = ({
  label, name, multiple, provider,
}) => (
  <p>
    <label htmlFor={name}>
      <span>{label}</span>
      <span className="selectbox">
        <Field id={name} name={name} component="select" multiple={multiple}>
          <option key="default" />
          {provider && provider.map(renderOption)}
        </Field>
      </span>
    </label>
  </p>
);

SelectBox.defaultProps = {
  // onChange: noop,
  multiple: false,
};

SelectBox.propTypes = {
  multiple: PropTypes.bool,
  // onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default SelectBox;
