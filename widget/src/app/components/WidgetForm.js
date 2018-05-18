import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Form } from 'react-final-form';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

const validator = (questions) => {
  const keys = questions.map(obj => obj.type);
  return (values) => {
    const errors = {};
    keys.reduce((acc, key) => {
      if (!values[key]) {
        return { ...acc, [key]: 'Required' };
      }
      return acc;
    }, errors);
    return errors;
  };
};

const WidgetForm = ({ code }) => (
  <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
    {({ loading, error, data: { widget } }) => {
      if (error || !widget || loading) return <p>...</p>;
      const questions = (widget && widget.questions) || null;
      const validate = validator(questions);
      return (
        <div id="assec-widget-form" className="flex-1">
          <Form onSubmit={() => {}}
            validate={validate}
            initialValues={{
              department: null,
            }}
            render={formprops => <div>toto</div>} />
        </div>
      );
    }}
  </Query>
);

WidgetForm.propTypes = {
  code: PropTypes.string.isRequired,
};

export default WidgetForm;
