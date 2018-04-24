import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const getkey = (name, index) => `checkbox::${name}::${index}`;

const CheckboxGroup = ({
  name, label, provider, display, ...rest
}) => {
  const cssclass = `flex-${
    display !== 'inline' ? 'rows' : 'columns'
  } flex-wrap wrap3 list`;
  return (
    <p className="checkbox-group pt12 px12">
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
                    value={obj.id}
                    type="checkbox"
                    component="input" />
                  <span>{obj.label}</span>
                </label>
              );
            })}
        </span>
      </span>
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
