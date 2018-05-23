import React from 'react';
import isemail from 'isemail';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Form, Field } from 'react-final-form';

const validate = (values) => {
  const errors = {};
  if (!values.email || !isemail.validate(values.email)) {
    errors.email = true;
  }
  return errors;
};

const SummaryView = ({ values, mutate, disabled }) => (
  <Form initialValues={values}
    validate={validate}
    initalvalues={values}
    onSubmit={(formValues, form) => {
      const {
        situations: { lat, lng },
        email,
        usages,
        origines,
        department,
      } = formValues;
      return mutate({
        variables: {
          email,
          department,
          preferences: {
            usages,
            origines,
            department,
            latlng: { lat, lng },
          },
        },
      }).then(() => form.reset());
    }}
    render={({ handleSubmit, pristine, invalid }) => {
      const showtooltip = !disabled && (!pristine && invalid);
      const errmessage = 'Veuillez saisir une adresse email valide.';
      return (
        <div className="col-right flex-rows">
          <h5 className="mb20">
            <span>Vos Préférences</span>
          </h5>
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
  values: PropTypes.object.isRequired,
};

export default SummaryView;
