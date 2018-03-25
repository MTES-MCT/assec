import React from 'react';
import PropTypes from 'prop-types';

const selectstep = (key, choice, fields) => {
  const [field] = fields.filter(obj => obj.id === key);
  const { label, values } = field;
  const [reponse] = values.filter(obj => obj.id === choice);
  return { label, reponse };
};

const FormSidebarContent = ({ choices, fields }) => (
  <ul id="user-case">
    {Object.keys(choices).map((key) => {
      const { label, reponse } = selectstep(key, choices[key].choice, fields);
      return (
        <li key={`choice::${key}`}>
          <strong>{label}</strong>
          <span>{reponse.value}</span>
        </li>
      );
    })}
  </ul>
);

FormSidebarContent.propTypes = {
  fields: PropTypes.array.isRequired,
  choices: PropTypes.object.isRequired,
};

export default FormSidebarContent;
