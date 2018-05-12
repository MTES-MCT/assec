import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import deepequal from 'fast-deep-equal';
// import { bindActionCreators } from 'redux';
import { Query } from 'react-apollo';
// import { getFormValues, clearFields } from 'redux-form';

// application
// import { FORM_NAME } from './constants';
import { usedebug } from './core/utils/usedebug';
import { LOAD_DEPARTMENT_WIDGET } from './apolloql';
// import { formSubmit, loadForm } from './actions';
// import checkRequired from './actions/check-required';
// import FormFields from './components/FormFields';
// import FormResults from './components/FormResults';
// import FormNavigation from './components/FormNavigation';

class PageComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { code: null };
  }

  componentWillMount () {
    const parsed = queryString.parse(document.location.search);
    this.setState({ code: parsed.department || null });
  }

  // componentWillReceiveProps ({ stepskeys, choiceskeys }) {
  //   if (deepequal(stepskeys, this.props.stepskeys)) {
  //     // si le fil d'ariane contient les même éléments
  //     return;
  //   }
  //   const filtered = choiceskeys.filter(key => !stepskeys.includes(key));
  //   if (!filtered.length) return;
  //   // Supprime les entrees du formulaire
  //   // dont l'input n'est pas present dans le fil d'ariane
  //   // utile dans le cas de stepBackward/stepFormard
  //   this.actions.clearFields(FORM_NAME, false, false, filtered);
  // }

  render () {
    const {
      // rules,
      // fields,
      // choices,
      activestep,
      // canforward,
      // showresults,
      // canbackward,
      // disabledsteps,
    } = this.props;
    const { code } = this.state;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} variables={{ code }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log('data', data);
          return (
            <div id="app-container" className="flex-rows">
              <Helmet>
                <body className={`current-step-${activestep}`} />
                <title>Assec{usedebug() ? ' | Development' : ''}</title>
              </Helmet>
              <div id="screen-container" />
            </div>
          );
        }}
      </Query>
      // <div id="screen-container">
      //   <div id="app-content" className="flex-columns">
      //     <div id="stepper-form" className="column flex4">
      //       {!rules &&
      //         fields &&
      //         fields.length > 0 && (
      //         <FormFields fields={fields}
      //           activestep={activestep}
      //           disabledsteps={disabledsteps}
      //           onSubmit={values =>
      //             this.actions.formSubmit(client, values)
      //           }
      //           onRequired={index => this.actions.checkRequired(index)} />
      //       )}
      //       {rules && <FormResults rules={rules.values} />}
      //       <FormNavigation showresults={showresults}
      //         canforward={canforward}
      //         canbackward={canbackward}
      //         canreset={rules !== false} />
      //     </div>
      //   </div>
      // </div>
    );
  }
}

PageComponent.propTypes = {
  // client: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
  activestep: PropTypes.number.isRequired,
  // navigation
  // canforward: PropTypes.bool.isRequired,
  // canbackward: PropTypes.bool.isRequired,
  // showresults: PropTypes.bool.isRequired,
  // rules: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  //
  // fields: PropTypes.array.isRequired,
  // choices: PropTypes.object.isRequired,
  // stepskeys: PropTypes.array.isRequired,
  // choiceskeys: PropTypes.array.isRequired,
  // disabledsteps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const {
    stepper: { activestep, disabledsteps },
    // steppedform: { fields, restrictionsapplicable: rules },
  } = state;
  // const choices = getFormValues(FORM_NAME)(state) || {};
  // const choiceskeys = Object.keys(choices);
  // const steps = fields
  //   .filter((o, index) => !disabledsteps.includes(index))
  //   .map(({ id, label }) => ({ id, label }));
  // const stepskeys = steps.map(({ id }) => id);
  // const canbackward = activestep > 0;
  // const canforward = choiceskeys.length > activestep;
  // // defini si le dernier resultats a ete selectionne
  // // par l'utilisateur
  // const showresults =
  //   choiceskeys.length === steps.length && activestep === steps.length - 1;
  return {
    // rules,
    // fields,
    // choices,
    // stepskeys,
    activestep,
    // canforward,
    // choiceskeys,
    // canbackward,
    // showresults,
    disabledsteps,
  };
};

export default connect(mapStateToProps)(PageComponent);
