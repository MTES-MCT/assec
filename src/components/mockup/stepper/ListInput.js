import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

const ListInput = ({ id, question, values }) => (
  <FormSection name={id} component="fieldset">
    <span>{question}</span>
    <label htmlFor="iscanal">
      <span>Nom du Canal</span>
      <Field id="iscanal" name="choice" component="select">
        <option key="listinput::default" />
        {values.map(obj => (
          <option key={`listinput::${obj.id}`} value={obj.id}>
            {obj.value}
          </option>
        ))}
      </Field>
    </label>
  </FormSection>
);

ListInput.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
};

export default ListInput;
