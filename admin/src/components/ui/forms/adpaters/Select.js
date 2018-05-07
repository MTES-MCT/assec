import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const SelectAdapter = ({
  input, provider, valueKey, labelKey, ...rest
}) => (
  <select {...rest}
    value={input.value}
    onChange={({ target }) => input.onChange(target.value)}>
    <option key="default" value="" />
    {provider &&
      provider.map(obj => (
        <option key={obj[valueKey]} value={obj[valueKey]}>
          {obj[labelKey]}
        </option>
      ))}
  </select>
);

SelectAdapter.defaultProps = {
  valueKey: 'id',
  labelKey: 'label',
};

SelectAdapter.propTypes = {
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  input: PropTypes.object.isRequired,
  provider: PropTypes.array.isRequired,
};

export default SelectAdapter;
