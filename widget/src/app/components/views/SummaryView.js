import React from 'react';
import isemail from 'isemail';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Form, Field } from 'react-final-form';

// application
// import { capitalize } from './../../core/capitalize';

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

const parseChoices = (values, questions) =>
  questions.map((obj) => {
    const { type, title, display } = obj;
    const value = values[type].label || values[type];
    return { value, title, display };
  });

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
      const errmessage = 'Veuillez saisir une adresse email valide.';
      return (
        <div className="col-right flex-rows">
          {console.log('choices', parseChoices(choices, questions))}
          <h5 className="mb40">
            <span>Vos Préférences</span>
          </h5>
          <ul />
          <form name="preferences-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb12">
              <span>
                <i className="icon icon-mail mr3" />
                <span>Prévenez moi de tout changement des règles</span>
              </span>
            </label>
            <div id="alert-input" className="flex-columns">
              <Tooltip arrow
                hideOnClick
                position="top"
                trigger="keyup"
                arrowSize="small"
                open={showtooltip}
                title={errmessage}
                disabled={!showtooltip}>
                <Field className="field flex-2 py12 px20"
                  id="email"
                  type="email"
                  name="email"
                  component="input"
                  disabled={disabled}
                  placeholder="Votre email" />
              </Tooltip>
              <button className="align-center py12 px12 pl20"
                type="submit"
                disabled={disabled}>
                <span>
                  {disabled && <i className="animate-spin icon-spin6" />}
                  {!disabled && <span>Rester informé</span>}
                </span>
              </button>
            </div>
          </form>
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
