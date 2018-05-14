import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';

// application
import MapInput from './forms/MapInput';
import ListInput from './forms/ListInput';
import ChoiceInput from './forms/ChoiceInput';

const renderInput = (question) => {
  switch (question.display) {
  case 'zones':
    return <MapInput {...question} />;
  case 'list':
    return <ListInput {...question} />;
  case 'choice':
    return <ListInput {...ChoiceInput} />;
  default:
    return null;
  }
};

const WidgetSurvey = ({ step, provider }) => {
  const question = (!provider && {}) || {
    name: provider[step].type,
    display: provider[step].display,
    values: provider[step].values || provider[step].zones,
  };
  return (
    <div id="assec-widget-survey">
      <Form onSubmit={() => {}}>{renderInput(question)}</Form>
    </div>
  );
};

WidgetSurvey.propTypes = {
  step: PropTypes.number.isRequired,
  provider: PropTypes.array.isRequired,
};

const connected = connect(state => ({
  step: state.step,
}))(WidgetSurvey);

export default reduxForm({
  initialValues: {},
  form: 'ASSEC_SURVEY_FORM',
})(connected);
