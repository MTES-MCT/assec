import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import today from './../../lib/today';
import { FORM_NAME } from './../../constants';

const FormSidebar = ({ responses }) => (
  <div id="app-sidebar-left" className="column flex1">
    <h6 className="suptitle">
      <small>{today()}</small>
    </h6>
    <h4 className="title">
      <span>Votre sélection</span>
    </h4>
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
  </div>
);

FormSidebar.propTypes = {
  responses: PropTypes.array.isRequired,
};

const mapStateToProps = ({ form }) => {
  const values = (form[FORM_NAME] && form[FORM_NAME].values) || [];
  console.log('values', values);
  return {
    responses: [],
  };
};

export default connect(mapStateToProps)(FormSidebar);
