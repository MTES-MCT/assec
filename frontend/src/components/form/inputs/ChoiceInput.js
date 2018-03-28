import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

// application
import './choice-input.css';

const ChoiceInput = ({
  id, help, label, values, onChange,
}) => (
  <FormSection name={id}
    onChange={onChange}
    component="fieldset"
    className="input-type-choice">
    <h3>{label}</h3>
    {help && <p>{help}</p>}
    <div className="flex-columns">
      {values.map((obj, index) => {
        const key = `choiceinput::${obj.id}`;
        const htmlfor = `choice_${index}`;
        return (
          <label key={key}
            className="choice-input items-center"
            htmlFor={htmlfor}>
            <Field id={htmlfor}
              type="radio"
              name="choice"
              component="input"
              value={`${obj.id}`} />
            <span>{obj.value}</span>
          </label>
        );
      })}
    </div>
  </FormSection>
);

ChoiceInput.propTypes = {
  id: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChoiceInput;
