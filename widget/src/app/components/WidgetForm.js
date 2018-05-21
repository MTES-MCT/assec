import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';
import FormResults from './forms/FormResults';
import MapInput from './inputs/MapInput';
import ListInput from './inputs/ListInput';
import ChoiceInput from './inputs/ChoiceInput';

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

const getComponentByType = (display) => {
  switch (display) {
  case 'list':
    return ListInput;
  case 'choice':
    return ChoiceInput;
  case 'zones':
    return MapInput;
  default:
    return null;
  }
};

class WidgetForm extends React.PureComponent {
  render () {
    const { code, step } = this.props;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
        {({ loading, error, data: { widget } }) => {
          if (error || !widget || loading) return <p>...</p>;
          const { questions, department } = widget;
          const initialValues = { department };
          const validate = validator(questions);
          const showresults = step > questions.length;
          return (
            <div id="assec-widget-form" className="flex-1">
              <Form initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, values }) => (
                  <form className="" onSubmit={handleSubmit}>
                    {console.log('values', values)}
                    <Field name="department" type="hidden" component="input" />
                    {!showresults &&
                      questions.map((question, index) => {
                        const { display } = question;
                        const isvisible = index === step;
                        const Component = getComponentByType(display);
                        if (!Component || !isvisible) return null;
                        return (
                          <Component {...question}
                            key={question.id}
                            visible={isvisible}
                            onForwardHandler={() => {
                              console.log('clicked on next');
                            }} />
                        );
                      })}
                  </form>
                )}
                onSubmit={() => {}} />
              {(showresults && <FormResults />) || null}
            </div>
          );
        }}
      </Query>
    );
  }
}

WidgetForm.propTypes = {
  step: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
};

export default connect(({ step }) => ({ step }))(WidgetForm);
