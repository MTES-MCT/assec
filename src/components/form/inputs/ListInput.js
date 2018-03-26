import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

// application
import './list-input.css';

const ListInput = ({
  id, help, label, values,
}) => (
  <FormSection name={id} component="fieldset" className="input-type-list">
    <h3>{label}</h3>
    {help && <p>{help}</p>}
    <div className="flex-rows">
      <label htmlFor="choice" className="list-input flex-columns items-center">
        <Field name="choice" component="select">
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
  label: PropTypes.string.isRequired,
};

export default ListInput;
