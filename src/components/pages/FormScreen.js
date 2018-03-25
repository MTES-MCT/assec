import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepequal from 'fast-deep-equal';
import { bindActionCreators } from 'redux';
import { getFormValues, clearFields } from 'redux-form';

// application
import { FORM_NAME } from './../../constants';
import FormFields from './../form/FormFields';
import loadForm from './../../actions/load-form';
import FormNavigation from './../form/FormNavigation';
import StepperProgress from './../form/stepper/StepperProgress';
import FormSidebarHeader from './../form/sidebar/FormSidebarHeader';
import FormSidebarContent from './../form/sidebar/FormSidebarContent';

class FormScreen extends React.PureComponent {
  constructor (props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators({ loadForm, clearFields }, dispatch);
  }

  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    this.actions.loadForm();
  }

  componentWillReceiveProps ({ stepskeys, choiceskeys }) {
    if (deepequal(stepskeys, this.props.stepskeys)) return;
    const filtered = choiceskeys.filter(key => !stepskeys.includes(key));
    if (!filtered.length) return;
    // Supprime les entrees du formulaire
    // dont l'input n'est pas present dans le fil d'ariane
    // utile dans le cas de stepBackward/stepFormard
    this.actions.clearFields(FORM_NAME, false, false, filtered);
  }

  render () {
    const {
      steps,
      choices,
      canreset,
      formfields,
      activestep,
      canforward,
      showresults,
      canbackward,
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
            <FormNavigation showresults={showresults}
              canreset={canreset}
              canforward={canforward}
              canbackward={canbackward} />
          </div>
        </div>
      </div>
    );
  }
}

FormScreen.propTypes = {
  // navigation
  canreset: PropTypes.bool.isRequired,
  canforward: PropTypes.bool.isRequired,
  canbackward: PropTypes.bool.isRequired,
  showresults: PropTypes.bool.isRequired,
  //
  steps: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  choices: PropTypes.object.isRequired,
  stepskeys: PropTypes.array.isRequired,
  formfields: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
  choiceskeys: PropTypes.array.isRequired,
  disabledsteps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { stepper: { activestep, disabledsteps }, formfields } = state;
  const choices = getFormValues(FORM_NAME)(state) || {};
  const choiceskeys = Object.keys(choices);
  const steps = formfields
    .filter((o, index) => !disabledsteps.includes(index))
    .map(({ id, label }) => ({ id, label }));
  const stepskeys = steps.map(({ id }) => id);
  const canbackward = activestep > 0;
  const canforward = choiceskeys.length > activestep;
  const canreset = activestep > choiceskeys.length + 1;
  const showresults = false;
  // choiceskeys.length === steps.length;
  return {
    steps,
    choices,
    canreset,
    stepskeys,
    formfields,
    activestep,
    canforward,
    choiceskeys,
    canbackward,
    showresults,
    disabledsteps,
  };
};

export default connect(mapStateToProps)(FormScreen);
