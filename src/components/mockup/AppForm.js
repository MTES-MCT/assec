import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, formValueSelector } from 'redux-form';

// application
import ListInput from './inputs/ListInput';
import Constants from './../../constants';
import ChoiceInput from './inputs/ChoiceInput';
import loadForm from './../../actions/loadForm';
import FormNavigation from './forms/FormNavigation';
import StepperProgress from './stepper/StepperProgress';

class AppForm extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { current: 0 };
    this.resetClick = this.resetClick.bind(this);
    this.forwardClick = this.forwardClick.bind(this);
    this.backwardClick = this.backwardClick.bind(this);
    this.renderFormStep = this.renderFormStep.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(loadForm());
  }

  resetClick () {
    const { reset } = this.props;
    this.setState({ current: 0 }, reset);
  }

  forwardClick () {
    this.setState(prev => ({
      current: prev.current + 1,
    }));
  }

  backwardClick () {
    this.setState(prev => ({
      current: prev.current - 1,
    }));
  }

  renderFormStep (obj, index) {
    const { current } = this.state;
    if (current !== index) return null;
    let Instance = null;
    switch (obj.type) {
    case 'list':
      Instance = ListInput;
      break;
    case 'choice':
      Instance = ChoiceInput;
      break;
    default:
      Instance = null;
      break;
    }
    return Instance && <Instance key={`formstep_${obj.name}`} {...obj} />;
  }

  render () {
    const { current } = this.state;
    const {
      // reset,
      fields,
      // maxsteps,
      // nextstep,
      handleSubmit,
    } = this.props;
    return (
      <div id="stepper-form" className="column flex4">
        <StepperProgress current={current} />
        <Form onSubmit={handleSubmit(() => {})}>
          {fields.map(this.renderFormStep)}
        </Form>
        <FormNavigation />
      </div>
    );
  }
}

AppForm.propTypes = {
  reset: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  maxsteps: PropTypes.number.isRequired,
  nextstep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const MockupStepperForm = reduxForm({
  initialValues: {},
  form: Constants.FORM_NAME,
})(AppForm);

const selector = formValueSelector(Constants.FORM_NAME);
const mapStateToProps = (state) => {
  const { fields } = state;
  const keys = fields.map(obj => obj.id);
  const formState = (keys.length && selector(state, ...keys)) || 0;
  const maxsteps = keys.length;
  const nextstep = Object.keys(formState).length;
  return {
    fields,
    maxsteps,
    nextstep,
  };
};

export default connect(mapStateToProps)(MockupStepperForm);
