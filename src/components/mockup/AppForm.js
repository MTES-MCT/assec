import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm } from 'redux-form';

// application
import ListInput from './forms/ListInput';
import Constants from './../../constants';
import ChoiceInput from './forms/ChoiceInput';
import loadForm from './../../actions/load-form';
import checkConditions from './../../actions/check-conditions';

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
    this.setState({ current: nextprops.activestep });
  }

  renderFormStep (obj, index) {
    const { current } = this.state;
    // only shows current field
    // will not show anything if current is superior at fields length
    // FIXME -> show all fields and hide/visible as needed
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
      <Form onSubmit={handleSubmit(() => {})}
        onChange={() => {
          this.props.dispatch(checkConditions());
        }}>
        {fields.map(this.renderFormStep)}
      </Form>
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
