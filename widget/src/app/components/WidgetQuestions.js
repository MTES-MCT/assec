import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

// application
import { submitForm } from './../actions';
import MapInput from './inputs/MapInput';
import ListInput from './inputs/ListInput';
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

class WidgetQuestions extends React.PureComponent {
  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators({ submitForm }, dispatch);
  }
  render () {
    const {
      step, choices, questions, initialValues,
    } = this.props;
    return (
      <Form initialValues={initialValues}
        onSubmit={values => this.actions.submitForm(values)}
        render={({ handleSubmit, values, form }) => (
          <React.Fragment>
            {choices && (
              <nav className="navigation">
                <ResetButton reset={() => form.reset()} />
              </nav>
            )}
            <form name="questions-form"
              onSubmit={handleSubmit}
              className={choices ? 'hidden' : ''}>
              <Field name="department" type="hidden" component="input" />
              {!choices &&
                questions.map((question, index) => {
                  const { display } = question;
                  const isvisible = index === step;
                  const islast = step + 1 === questions.length;
                  const Component = getComponentByType(display);
                  const formValue = (values && values[question.type]) || null;
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
          </React.Fragment>
        )} />
    );
  }
}

WidgetQuestions.defaultProps = {
  choices: null,
};

WidgetQuestions.propTypes = {
  choices: PropTypes.object,
  step: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default connect()(WidgetQuestions);
