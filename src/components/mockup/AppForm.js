import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';

// application
import ListInput from './inputs/ListInput';
import Constants from './../../constants';
import ChoiceInput from './inputs/ChoiceInput';
import loadForm from './../../actions/loadForm';
import FormNavigation from './forms/FormNavigation';
import { checkConditions } from './../../actions/navigation';

class AppForm extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { current: 0 };
    this.renderFormStep = this.renderFormStep.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(loadForm());
  }

  componentWillReceiveProps (nextprops) {
    const index = this.state.current;
    if (index === nextprops.activestep) return;
    this.setState({ current: nextprops.activestep }, () => {
      const shouldcheck = nextprops.activestep !== 0;
      if (!shouldcheck) return;
      // sinon on vérifie qu'il valide les conditions
      this.props.dispatch(checkConditions());
    });
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
    const { fields, handleSubmit } = this.props;
    return (
      <div id="stepper-form" className="column flex4">
        <Form onSubmit={handleSubmit(() => {})}>
          {fields.map(this.renderFormStep)}
        </Form>
        <FormNavigation />
      </div>
    );
  }
}

AppForm.propTypes = {
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  formvalues: PropTypes.object.isRequired,
  activestep: PropTypes.number.isRequired,
  // redux form injected props
  array: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const MockupStepperForm = reduxForm({
  initialValues: {},
  form: Constants.FORM_NAME,
})(AppForm);

const mapStateToProps = ({ form, fields, activestep }) => {
  const values =
    (form[Constants.FORM_NAME] && form[Constants.FORM_NAME].values) || {};
  return {
    fields,
    activestep,
    formvalues: Object.keys(values).reduce(
      (acc, key) => Object.assign(acc, { [key]: values[key].choice }),
      {},
    ),
  };
};

export default connect(mapStateToProps)(MockupStepperForm);
