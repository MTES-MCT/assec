import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const getkey = (name, index) => `radio::${name}::${index}`;

const RadioGroup = ({
  name, label, provider, display, ...rest
}) => {
  const cssclass = `flex-${display !== 'inline' ? 'rows' : 'columns'}`;
  return (
    <p className="radio-group">
      <label htmlFor={name}>
        <span>{label}</span>
        <span className={cssclass}>
          {provider &&
            provider.map(obj => (
              <span key={getkey(name, obj.id)}>
                <Field {...rest} name={name} type="radio" component="input" />
                <span>{obj.name}</span>
              </span>
            ))}
        </span>
      </label>
    </p>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default RadioGroup;
