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
import ResetButton from './buttons/ResetButton';

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
          return (
            <div id="assec-widget-form" className="flex-rows flex-1">
              <Form initialValues={initialValues}
                onSubmit={values => this.actions.submitForm(values)}
                render={({ handleSubmit, values, form }) => (
                  <React.Fragment>
                    {choices && <ResetButton reset={() => form.reset()} />}
                    <form onSubmit={handleSubmit}
                      className={choices ? 'hidden' : ''}>
                      <Field name="department"
                        type="hidden"
                        component="input" />
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
                    {choices && <FormResults values={choices} />}
                  </React.Fragment>
                )} />
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
