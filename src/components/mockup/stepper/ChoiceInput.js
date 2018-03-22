import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

const ChoiceInput = ({ id, question, values }) => (
  <FormSection name={id} component="fieldset">
    <span>{question}</span>
    {values.map((obj, index) => (
      <label key={`choiceinput::${obj.id}`} htmlFor={`${obj.id}_true`}>
        <span>{obj.value}</span>
        <Field id={`${obj.id}_true`}
          type="radio"
          name="choice"
          component="input"
          value={`${index}`} />
      </label>
    ))}
  </FormSection>
);

ChoiceInput.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
};

export default ChoiceInput;
