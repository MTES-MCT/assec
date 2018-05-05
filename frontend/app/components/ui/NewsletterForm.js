import React from 'react';
import isemail from 'isemail';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { graphql } from 'react-apollo';
import { Field, Form } from 'react-final-form';
import mutationState from 'react-apollo-mutation-state';

// application
import { CREATE_SUBSCRIBER } from './../../core/apolloql';

const validate = (values) => {
  const errors = {};
  if (!values.email || !isemail.validate(values.email)) {
    errors.email = true;
  }
  return errors;
};

class NewsletterForm extends React.PureComponent {
  render () {
    const {
      label,
      placeholder,
      initialValues,
      createSubscriber,
      mutation: { loading, error: qlerror },
    } = this.props;
    return (
      <Form validate={validate}
        initialValues={initialValues}
        render={({
          invalid, pristine, handleSubmit, values,
        }) => {
          const value = (values && values.email) || '';
          const submitdisabled = pristine || invalid || loading;
          const showtooltip =
            !loading && (!pristine && invalid && value.length > 7);
          const errmessage =
            qlerror || 'Veuillez saisir une adresse email valide.';
          return (
            <div className="newsletter-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="notice mb12">
                  <span>
                    <i className="icon icon-mail mr3" />
                    <span>{label}</span>
                  </span>
                </label>
                <div className="flex-columns">
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
                      placeholder={placeholder || ''} />
                  </Tooltip>
                  <button className="flex-1 py12 px12 pl20"
                    type="submit"
                    disabled={submitdisabled}>
                    <span>
                      <span>Rester informé</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          );
        }}
        onSubmit={({ email }) => {
          createSubscriber(email);
        }} />
    );
  }
}

NewsletterForm.defaultProps = {
  initialValues: { email: '' },
};

NewsletterForm.propTypes = {
  initialValues: PropTypes.object,
  label: PropTypes.string.isRequired,
  mutation: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  createSubscriber: PropTypes.func.isRequired,
};

const withData = graphql(CREATE_SUBSCRIBER, {
  props: ({ mutate, ownProps }) => {
    const { mutation } = ownProps;
    return {
      createSubscriber: (email) => {
        mutation.set({ loading: true, error: null });
        return mutate({ variables: { email } })
          .then(() => {
            mutation.set({ loading: false, error: null });
          })
          .catch(() => {
            const error =
              'Une erreur est survenue veuillez réessayer ultérieurement';
            mutation.set({ loading: false, error });
          });
      },
    };
  },
});

const withMutationState = mutationState();
export default withMutationState(withData(NewsletterForm));
