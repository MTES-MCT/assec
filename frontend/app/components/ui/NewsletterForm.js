import React from 'react';
import isemail from 'isemail';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { graphql } from 'react-apollo';
import { Field, Form } from 'react-final-form';
import mutationState from 'react-apollo-mutation-state';

// application
import { CREATE_SUBSCRIBER } from './../../apolloql';
import { subWarning, subError, subSuccess, subClose } from './../../actions';

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
      dispatch,
      placeholder,
      initialValues,
      createSubscriber,
      mutation: { loading },
    } = this.props;
    return (
      <Form validate={validate}
        initialValues={initialValues}
        render={({ invalid, pristine, handleSubmit }) => {
          const submitdisabled = pristine || invalid || loading;
          const showtooltip = !loading && (!pristine && invalid);
          const errmessage = 'Veuillez saisir une adresse email valide.';
          return (
            <div className="newsletter-form">
              <form onSubmit={handleSubmit} autoComplete="off">
                {/* FIXME suppr l'ID du department defini en dur via les initalvalues */}
                <Field name="department" type="hidden" component="input" />
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
                      disabled={loading}
                      placeholder={placeholder || ''} />
                  </Tooltip>
                  <button className="flex-1 py12 px12 pl20"
                    type="submit"
                    disabled={submitdisabled}>
                    <span>
                      {loading && <i className="animate-spin icon-spin6" />}
                      {!loading && <span>Rester informé</span>}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          );
        }}
        onSubmit={(values, form) =>
          createSubscriber(values, dispatch).then(() => form.reset())
        } />
    );
  }
}

NewsletterForm.defaultProps = {
  initialValues: {
    email: '',
    // FIXME ID du departement 83 pour la demo
    // cet ID doit etre dynamique soit par l'URL
    // soit par une selectbox
    department: '5ad84a9f73150f000eeaf0d0',
  },
};

NewsletterForm.propTypes = {
  initialValues: PropTypes.object,
  label: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  mutation: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  createSubscriber: PropTypes.func.isRequired,
};

const withData = graphql(CREATE_SUBSCRIBER, {
  props: ({ mutate, ownProps: { mutation } }) => {
    let timer = null;
    return {
      createSubscriber: (variables, dispatch) => {
        mutation.set({ loading: true, error: false });
        const timeout = 3 * 1000; // 30 secondes de timeout
        timer = setTimeout(() => {
          if (timer) clearTimeout(timer);
          timer = dispatch(subWarning());
        }, timeout);
        return mutate({ variables })
          .then(() => {
            if (timer) clearTimeout(timer);
            dispatch(subSuccess());
            timer = setTimeout(() => dispatch(subClose()), timeout);
            mutation.set({ loading: false, error: false });
          })
          .catch(() => {
            if (timer) clearTimeout(timer);
            dispatch(subError());
            timer = setTimeout(() => dispatch(subClose()), timeout);
            mutation.set({ loading: false, error: true });
          });
      },
    };
  },
});

const withMutationState = mutationState();
const connected = connect()(NewsletterForm);
export default withMutationState(withData(connected));
