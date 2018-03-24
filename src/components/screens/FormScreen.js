import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { FORM_NAME } from './../../constants';
import FormFields from './../form/FormFields';
import loadForm from './../../actions/load-form';
import FormNavigation from './../form/FormNavigation';
import StepperProgress from './../form/stepper/StepperProgress';
import FormSidebarHeader from './../form/sidebar/FormSidebarHeader';
import FormSidebarContent from './../form/sidebar/FormSidebarContent';

class FormScreen extends React.PureComponent {
  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    this.props.dispatch(loadForm());
  }

  render () {
    const {
      steps,
      locked,
      choices,
      formfields,
      activestep,
      disabledsteps,
    } = this.props;
    return (
      <div id="screen-container">
        <StepperProgress active={activestep} steps={steps} />
        <div id="app-content" className="flex-columns">
          <div id="app-sidebar-left" className="column flex1">
            <FormSidebarHeader />
            <FormSidebarContent fields={formfields} choices={choices} />
          </div>
          <div id="stepper-form" className="column flex4">
            <FormFields fields={formfields}
              active={activestep}
              disabled={disabledsteps} />
            <FormNavigation disabled={locked} />
          </div>
        </div>
      </div>
    );
  }
}

FormScreen.propTypes = {
  steps: PropTypes.array.isRequired,
  locked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  choices: PropTypes.object.isRequired,
  formfields: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
  disabledsteps: PropTypes.array.isRequired,
};

const mapStateToProps = ({ form, stepper, formfields }) => {
  const { activestep, disabledsteps } = stepper;
  const choices = (form[FORM_NAME] && form[FORM_NAME].values) || {};
  return {
    stepper,
    choices,
    formfields,
    activestep,
    locked: true,
    disabledsteps,
    steps: formfields
      .filter((o, index) => !disabledsteps.includes(index))
      .map(({ id, label }) => ({ id, label })),
  };
};

export default connect(mapStateToProps)(FormScreen);
