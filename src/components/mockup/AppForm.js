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

class AppForm extends React.PureComponent {
  constructor (props) {
    super(props);
    this.renderFormStep = this.renderFormStep.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(loadForm());
  }

  renderFormStep (obj, index) {
    const { activestep } = this.props;
    if (activestep !== index) return null;
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
  activestep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const MockupStepperForm = reduxForm({
  initialValues: {},
  form: Constants.FORM_NAME,
})(AppForm);

const mapStateToProps = ({ fields, activestep }) => ({
  fields,
  activestep,
});

export default connect(mapStateToProps)(MockupStepperForm);
