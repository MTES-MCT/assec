import React from 'react';
import PropTypes from 'prop-types';

const FormSidebarContent = ({ responses }) => (
  <ul id="user-case">
    {/* Object.keys(responses).map((key, index) => {
      const { question, type, values } = fields[index];
      // console.log('responses', responses);
      const reponse =
        type !== 'choice'
          ? responses[key].choice
          : values[parseInt(responses[key].choice, 10)].value;
      return (
        <li key={`question_${key}`}>
          <strong>{question}</strong>
          <span>{reponse}</span>
        </li>
      );
    }) */}
  </ul>
);

FormSidebarContent.propTypes = {
  responses: PropTypes.array.isRequired,
};

export default FormSidebarContent;
