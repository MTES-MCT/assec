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
import { LOAD_DEPARTMENT_WIDGET } from './queries';
import WidgetHeader from './components/WidgetHeader';
import WidgetSurvey from './components/WidgetSurvey';
import WidgetSummary from './components/WidgetSummary';
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
      step,
      // canforward,
      // showresults,
      // canbackward,
      // disabledsteps,
    } = this.props;
    const { code } = this.state;
    if (!code) return <p>Error le code est manquant :(</p>;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} variables={{ code }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error graphql :(</p>;
          const questions = (data && data.widget) || [];
          const total = questions.length;
          return (
            <React.Fragment>
              <Helmet>
                <body className={`current-step-${step}`} />
                <title>Assec{usedebug() ? ' | Development' : ''}</title>
              </Helmet>
              <div id="assec-widget" className="flex-rows">
                <WidgetHeader total={total} />
                <WidgetSummary provider={questions} />
                <WidgetSurvey provider={questions} choices={[]} />
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

PageComponent.propTypes = {
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { step } = state;
  return {
    step,
  };
};

export default connect(mapStateToProps)(PageComponent);
