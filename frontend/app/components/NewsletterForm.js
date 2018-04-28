import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.courriel) {
    errors.courriel = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.courriel)
  ) {
    errors.courriel = 'Invalid courriel address';
  }
  return errors;
};

const NewsletterForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <div className="newsletter-form">
      <form onSubmit={handleSubmit}>
        <div className="flex-columns">
          <Field className="field flex-2 py12 px20"
            type="email"
            name="courriel"
            component="input"
            placeholder="First Name" />
          <button className="flex-1 py12 px12 pl20"
            type="submit"
            disabled={pristine || submitting}>
            <span>
              <span>Rester informé</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

NewsletterForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'newsletter',
  validate,
})(NewsletterForm);
