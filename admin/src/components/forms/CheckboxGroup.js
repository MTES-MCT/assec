import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const getkey = (name, index) => `checkbox::${name}::${index}`;

const CheckboxGroup = ({
  name, label, provider, display, ...rest
}) => {
  const cssclass = `flex-${display !== 'inline' ? 'rows' : 'columns'}`;
  return (
    <p>
      <label htmlFor={name}>
        <span>{label}</span>
        <span className={cssclass}>
          {provider &&
            provider.map(obj => (
              <span key={getkey(name, obj.id)}>
                <Field {...rest}
                  name={name}
                  value={obj.id}
                  type="checkbox"
                  component="input" />
                <span>{obj.name}</span>
              </span>
            ))}
        </span>
      </label>
    </p>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default CheckboxGroup;
