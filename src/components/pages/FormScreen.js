import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepequal from 'fast-deep-equal';
import { bindActionCreators } from 'redux';
import { getFormValues, clearFields } from 'redux-form';

// application
import { FORM_NAME } from './../../constants';
import FormFields from './../form/FormFields';
import FormNavigation from './../form/FormNavigation';
import { loadForm, formSubmit } from './../../actions/form';
import checkConditions from './../../actions/check-conditions';
import StepperProgress from './../form/stepper/StepperProgress';
import FormSidebarHeader from './../form/sidebar/FormSidebarHeader';
import FormSidebarContent from './../form/sidebar/FormSidebarContent';

class FormScreen extends React.PureComponent {
  constructor (props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators(
      {
        loadForm,
        formSubmit,
        clearFields,
        checkConditions,
      },
      dispatch,
    );
  }

  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    this.actions.loadForm();
  }

  componentWillReceiveProps ({ stepskeys, choiceskeys }) {
    if (deepequal(stepskeys, this.props.stepskeys)) {
      // si le fil d'ariane contient les même éléments
      return;
    }
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
      fields,
      choices,
      activestep,
      canforward,
      showresults,
      canbackward,
      disabledsteps,
      isresultscreen,
    } = this.props;
    return (
      <div id="screen-container">
        <StepperProgress active={activestep} steps={steps} />
        <div id="app-content" className="flex-columns">
          <div id="app-sidebar-left" className="column flex1">
            <FormSidebarHeader />
            <FormSidebarContent fields={fields} choices={choices} />
          </div>
          <div id="stepper-form" className="column flex4">
            {!isresultscreen &&
              fields &&
              fields.length > 0 && (
              <FormFields fields={fields}
                activestep={activestep}
                disabledsteps={disabledsteps}
                onSubmit={values => this.actions.formSubmit(values)}
                onConditions={index => this.actions.checkConditions(index)} />
            )}
            <FormNavigation showresults={showresults}
              canforward={canforward}
              canreset={isresultscreen}
              canbackward={canbackward} />
          </div>
        </div>
      </div>
    );
  }
}

FormScreen.propTypes = {
  // navigation
  canforward: PropTypes.bool.isRequired,
  canbackward: PropTypes.bool.isRequired,
  showresults: PropTypes.bool.isRequired,
  isresultscreen: PropTypes.bool.isRequired,
  //
  steps: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  choices: PropTypes.object.isRequired,
  stepskeys: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
  choiceskeys: PropTypes.array.isRequired,
  disabledsteps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const {
    steppedform: { fields, results },
    stepper: { activestep, disabledsteps },
  } = state;
  const choices = getFormValues(FORM_NAME)(state) || {};
  const choiceskeys = Object.keys(choices);
  const steps = fields
    .filter((o, index) => !disabledsteps.includes(index))
    .map(({ id, label }) => ({ id, label }));
  const stepskeys = steps.map(({ id }) => id);
  const canbackward = activestep > 0;
  const canforward = choiceskeys.length > activestep;
  // defini si le dernier resultats a ete selectionne
  // par l'utilisateur
  const showresults =
    choiceskeys.length === steps.length && activestep === steps.length - 1;
  // last screen
  const isresultscreen = false;
  return {
    steps,
    fields,
    choices,
    stepskeys,
    activestep,
    canforward,
    choiceskeys,
    canbackward,
    showresults,
    disabledsteps,
    isresultscreen,
  };
};

export default connect(mapStateToProps)(FormScreen);
