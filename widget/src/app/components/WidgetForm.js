import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';
import { submitForm } from './../actions';
import MapInput from './inputs/MapInput';
import ListInput from './inputs/ListInput';
import FormResults from './forms/FormResults';
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
  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators({ submitForm }, dispatch);
  }
  render () {
    const { code, step, choices } = this.props;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
        {({ loading, error, data: { widget } }) => {
          if (error || !widget || loading) return <p>...</p>;
          const { questions, department } = widget;
          const initialValues = { department };
          const validate = validator(questions);
          return (
            <div id="assec-widget-form" className="flex-1">
              <Form initialValues={initialValues}
                validate={validate}
                onSubmit={values => this.actions.submitForm(values)}
                render={({ handleSubmit, values, form }) => (
                  <form onSubmit={handleSubmit}>
                    <Field name="department" type="hidden" component="input" />
                    {!choices &&
                      questions.map((question, index) => {
                        const { display } = question;
                        const isvisible = index === step;
                        const islast = step + 1 === questions.length;
                        const Component = getComponentByType(display);
                        const formValue =
                          (values && values[question.type]) || null;
                        if (!Component || !isvisible) return null;
                        return (
                          <Component {...question}
                            islast={islast}
                            key={question.id}
                            visible={isvisible}
                            formValue={formValue} />
                        );
                      })}
                  </form>
                )} />
              {(choices && <FormResults values={choices} />) || null}
            </div>
          );
        }}
      </Query>
    );
  }
}

WidgetForm.defaultProps = {
  choices: null,
};
WidgetForm.propTypes = {
  choices: PropTypes.object,
  step: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ step, choices }) => ({ step, choices }))(WidgetForm);
