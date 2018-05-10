import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepequal from 'fast-deep-equal';
import { bindActionCreators } from 'redux';
import { ApolloConsumer } from 'react-apollo';
import { getFormValues, clearFields } from 'redux-form';

// application
import { FORM_NAME } from './constants';
import { usedebug } from './core/utils/usedebug';
import { formSubmit, loadForm } from './actions';
import checkRequired from './actions/check-required';
import FormFields from './components/form/FormFields';
import FormResults from './components/form/FormResults';
import FormNavigation from './components/form/FormNavigation';
import StepperProgress from './components/form/stepper/StepperProgress';
import FormSidebarHeader from './components/form/sidebar/FormSidebarHeader';
import FormSidebarContent from './components/form/sidebar/FormSidebarContent';

class PageComponent extends React.Component {
  constructor (props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators(
      {
        loadForm,
        formSubmit,
        clearFields,
        checkRequired,
      },
      dispatch,
    );
  }

  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    const { client } = this.props;
    this.actions.loadForm(client);
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
      rules,
      fields,
      choices,
      activestep,
      canforward,
      showresults,
      canbackward,
      disabledsteps,
    } = this.props;
    return (
      <div id="app-container" className="flex-rows">
        <Helmet>
          <body className={`current-step-${activestep}`} />
          <title>Assec{usedebug() ? ' | Development' : ''}</title>
        </Helmet>
        <ApolloConsumer>
          {client => (
            <div id="screen-container">
              <StepperProgress steps={steps}
                active={!rules ? activestep : activestep + 1} />
              <div id="app-content" className="flex-columns">
                <div id="app-sidebar-left" className="column flex1">
                  <FormSidebarHeader />
                  <FormSidebarContent fields={fields}
                    choices={!rules ? choices : rules.choices} />
                </div>
                <div id="stepper-form" className="column flex4">
                  {!rules &&
                    fields &&
                    fields.length > 0 && (
                    <FormFields fields={fields}
                      activestep={activestep}
                      disabledsteps={disabledsteps}
                      onSubmit={values =>
                        this.actions.formSubmit(client, values)
                      }
                      onRequired={index => this.actions.checkRequired(index)} />
                  )}
                  {rules && <FormResults rules={rules.values} />}
                  <FormNavigation showresults={showresults}
                    canforward={canforward}
                    canbackward={canbackward}
                    canreset={rules !== false} />
                </div>
              </div>
            </div>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

PageComponent.propTypes = {
  client: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  activestep: PropTypes.number.isRequired,
  // navigation
  canforward: PropTypes.bool.isRequired,
  canbackward: PropTypes.bool.isRequired,
  showresults: PropTypes.bool.isRequired,
  rules: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  //
  steps: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  choices: PropTypes.object.isRequired,
  stepskeys: PropTypes.array.isRequired,
  choiceskeys: PropTypes.array.isRequired,
  disabledsteps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const {
    stepper: { activestep, disabledsteps },
    steppedform: { fields, restrictionsapplicable: rules },
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
  return {
    steps,
    rules,
    fields,
    choices,
    stepskeys,
    activestep,
    canforward,
    choiceskeys,
    canbackward,
    showresults,
    disabledsteps,
  };
};

export default connect(mapStateToProps)(PageComponent);