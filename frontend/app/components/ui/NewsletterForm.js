import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Field, Form } from 'react-final-form';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const NewsletterForm = ({ createSubscriber, label, placeholder }) => (
  <Form validate={validate}
    render={({ handleSubmit, pristine, invalid }) => (
      <div className="newsletter-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="notice mb12">
            <span>
              <i className="icon icon-mail mr3" />
              <span>{label}</span>
            </span>
          </label>
          <div className="flex-columns">
            <Field className="field flex-2 py12 px20"
              type="email"
              id="email"
              name="email"
              component="input"
              placeholder={placeholder || ''} />
            <button className="flex-1 py12 px12 pl20"
              type="submit"
              disabled={pristine || invalid}>
              <span>
                <span>Rester informé</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    )}
    onSubmit={({ email }) => {
      createSubscriber(email);
    }} />
);

NewsletterForm.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  createSubscriber: PropTypes.func.isRequired,
};

const createSubscriber = gql`
  mutation createSubscriber($email: String!) {
    createSubscriber(email: $email) {
      email
    }
  }
`;

export default graphql(createSubscriber, {
  props: ({ mutate }) => ({
    createSubscriber: (email) => {
      console.log('email', email);
      mutate({ variables: { email } });
    },
  }),
})(NewsletterForm);
