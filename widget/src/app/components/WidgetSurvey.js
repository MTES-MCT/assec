import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';

// application
import MapInput from './forms/MapInput';
// import ListInput from './questions/ListInput';
// import ChoiceInput from './questions/ChoiceInput';

const WidgetSurvey = ({ active, provider }) => {
  const question = (!provider && {}) || {
    id: provider[active].id,
    type: provider[active].type,
    display: provider[active].display,
    values: provider[active].values || provider[active].zones,
  };

  return (
    <div id="assec-widget-survey">
      <Form onSubmit={() => {}}>
        <MapInput {...question} />
      </Form>
    </div>
  );
};

WidgetSurvey.propTypes = {
  active: PropTypes.number.isRequired,
  provider: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'ASSEC_SURVER_FORM',
  initialValues: {},
})(WidgetSurvey);
