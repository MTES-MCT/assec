import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, formValueSelector } from 'redux-form';

// application
import ListInput from './stepper/ListInput';
import ChoiceInput from './stepper/ChoiceInput';
import loadForm from './../../actions/loadForm';

class MockupStepperComponent extends React.PureComponent {
  constructor (props) {
    super(props);
    this.resetClick = this.resetClick.bind(this);
    this.forwardClick = this.forwardClick.bind(this);
    this.backwardClick = this.backwardClick.bind(this);
    this.renderFormStep = this.renderFormStep.bind(this);
    this.state = { current: 0 };
  }

  componentDidMount () {
    this.props.dispatch(loadForm());
  }

  resetClick () {
    this.setState({ current: 0 });
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

  renderFormNavigation () {
    const {
      dirty, reset, nextstep, maxsteps,
    } = this.props;
    const { current } = this.state;
    const canbackward = current - 1 < 0;
    const canforward = dirty && nextstep > current;
    return (
      <div>
        {current < maxsteps && (
          <button onClick={this.backwardClick} disabled={canbackward}>
            <span>back</span>
          </button>
        )}
        {current < maxsteps && (
          <button onClick={this.forwardClick} disabled={!canforward}>
            <span>next</span>
          </button>
        )}
        {current >= maxsteps && (
          <button onClick={() => this.setState({ current: 0 }, reset)}>
            <span>reset</span>
          </button>
        )}
      </div>
    );
  }

  render () {
    const { handleSubmit, fields } = this.props;
    return (
      <div id="mockup-stepper">
        <Form onSubmit={handleSubmit(() => {})}>
          {fields.map(this.renderFormStep)}
        </Form>
        {this.renderFormNavigation()}
      </div>
    );
  }
}

MockupStepperComponent.propTypes = {
  reset: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  maxsteps: PropTypes.number.isRequired,
  nextstep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const formName = 'decisionnal';
const MockupStepperForm = reduxForm({
  form: formName,
  initialValues: {},
})(MockupStepperComponent);

const selector = formValueSelector(formName);
const mapStateToProps = (state) => {
  const { fields } = state;
  const keys = fields.map(obj => obj.id);
  const formState = (keys.length && selector(state, ...keys)) || 0;
  const maxsteps = keys.length;
  const nextstep = Object.keys(formState).length;
  return { fields, maxsteps, nextstep };
};

export default connect(mapStateToProps)(MockupStepperForm);
