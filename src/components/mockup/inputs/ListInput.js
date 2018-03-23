import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

const ListInput = ({
  id, help, question, values,
}) => (
  <FormSection name={id} component="fieldset" className="form-step">
    <h3>{question}</h3>
    {help && <p>{help}</p>}
    <div className="flex-rows">
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
    </div>
  </FormSection>
);

ListInput.propTypes = {
  id: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
};

export default ListInput;
