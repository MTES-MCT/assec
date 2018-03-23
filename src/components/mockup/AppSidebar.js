import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppSidebar = ({ responses, fields }) => {
  const today = new Date().toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  });
  return (
    <div id="app-sidebar-left" className="column flex1">
      <h6 className="suptitle">
        <small>{today}</small>
      </h6>
      <h4 className="title">
        <span>Votre sélection</span>
      </h4>
      <ul id="user-case">
        {Object.keys(responses).map((key, index) => {
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
        })}
      </ul>
    </div>
  );
};

AppSidebar.propTypes = {
  fields: PropTypes.array.isRequired,
  responses: PropTypes.object.isRequired,
};

const mapStateToProps = ({ fields, form }) => ({
  fields,
  responses: (form.decisionnal && form.decisionnal.values) || {},
});

export default connect(mapStateToProps)(AppSidebar);
