import React from 'react';
import PropTypes from 'prop-types';

const selectstep = (key, choice, fields) => {
  const [field] = fields.filter(obj => obj.id === key);
  const { label, type, values } = field;
  let reponse = choice;
  if (type === 'choice') reponse = values[parseInt(choice, 10)].value;
  return { label, reponse };
};

const FormSidebarContent = ({ choices, fields }) => (
  <ul id="user-case">
    {Object.keys(choices).map((key) => {
      const field = selectstep(key, choices[key].choice, fields);
      return (
        <li key={`choice::${key}`}>
          <strong>{field.label}</strong>
          <span>{field.reponse}</span>
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
