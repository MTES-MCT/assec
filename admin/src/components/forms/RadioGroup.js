import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const getkey = (name, index) => `radio::${name}::${index}`;

const RadioGroup = ({
  name, label, provider, display, ...rest
}) => {
  const cssclass = `flex-${
    display !== 'inline' ? 'rows' : 'columns'
  } flex-wrap wrap3`;
  return (
    <p className="radio-group pt12 px12">
      <span className="as-form-label">
        <span>{label}</span>
        <span className={cssclass}>
          {provider &&
            provider.map((obj) => {
              const key = getkey(name, obj.id);
              return (
                <label htmlFor={key} key={key}>
                  <Field {...rest}
                    id={key}
                    name={name}
                    type="radio"
                    value={obj.id}
                    component="input" />
                  <span>{obj.name}</span>
                </label>
              );
            })}
        </span>
      </span>
    </p>
  );
};

RadioGroup.defaultProps = {
  display: null,
};

RadioGroup.propTypes = {
  display: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  provider: PropTypes.array.isRequired,
};

export default RadioGroup;
