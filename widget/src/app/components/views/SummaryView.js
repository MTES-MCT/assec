import React from 'react';
import isemail from 'isemail';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

// application
import SummaryChoices from './SummaryChoices';
import EmailInput from './../inputs/EmailInput';

const validate = (values) => {
  const errors = {};
  if (!values.email || !isemail.validate(values.email)) {
    errors.email = true;
  }
  return errors;
};

const valuesToVariables = (obj) => {
  const { lat, lng } = obj.situations;
  return {
    email: obj.email,
    preferences: {
      latlng: { lat, lng },
      usages: obj.usages.value,
      department: obj.department,
      origines: obj.origines.value,
    },
  };
};

const SummaryView = ({
  questions, choices, mutate, disabled,
}) => (
  <Form initialValues={choices}
    validate={validate}
    initalvalues={choices}
    onSubmit={(formValues, form) => {
      const variables = valuesToVariables(formValues);
      return mutate({ variables }).then(() => form.reset());
    }}
    render={({ handleSubmit, pristine, invalid }) => {
      const showtooltip = !disabled && (!pristine && invalid);
      return (
        <div id="summary-view" className="col-right flex-rows">
          <form name="preferences-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb12">
              <span>
                <i className="icon icon-mail mr3" />
                <span>Prévenez moi de tout changement des règles</span>
              </span>
            </label>
            <EmailInput disabled={disabled} showtooltip={showtooltip} />
          </form>
          <SummaryChoices choices={choices} questions={questions} />
        </div>
      );
    }} />
);

SummaryView.propTypes = {
  mutate: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  choices: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

export default SummaryView;
