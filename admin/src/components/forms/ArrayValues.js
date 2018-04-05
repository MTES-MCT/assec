import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

const ArrayValues = ({ label, name: id, push }) => (
  <div className="arrayvalues">
    <span className="as-form-label">
      <span>{label}</span>
    </span>
    <p className="buttons">
      <button type="button" onClick={() => push(id, undefined)}>
        <i className="icon icon-plus" />
        <span>{`Ajouter ${label}`}</span>
      </button>
    </p>
    <FieldArray name={id}>
      {({ fields }) => (
        <ul className="list">
          {fields.map((name, index) => (
            <li key={name} className="item flex-columns">
              <Field name={`${name}.name`}
                type="text"
                component="input"
                placeholder="Nom de la zone" />
              <button type="button" onClick={() => fields.remove(index)}>
                <i className="icon icon-cancel-circled" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </FieldArray>
  </div>
);

ArrayValues.propTypes = {
  push: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ArrayValues;
