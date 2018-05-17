import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Form, Field } from 'react-final-form';

// application
import { LOAD_DEPARTMENT_WIDGET } from './apolloql/queries';
import { noop } from './core/noop';
import { usedebug } from './core/usedebug';
import WidgetPopin from './components/WidgetPopin';
import WidgetHeader from './components/WidgetHeader';
import WidgetFooter from './components/WidgetFooter';
import WidgetResult from './components/WidgetResult';
import WidgetSurvey from './components/WidgetSurvey';
import WidgetWelcome from './components/WidgetWelcome';
import WidgetNavigation from './components/WidgetNavigation';

const buildValidator = (questions) => {
  const keys = questions.map(obj => obj.type);
  return (values) => {
    const errors = {};
    keys.reduce((acc, key) => {
      if (!values[key]) {
        return { ...acc, [key]: 'Required' };
      }
      return acc;
    }, errors);
    return errors;
  };
};

const renderLoader = () => (
  <div id="assec-widget-event-window">
    <p className="align-center mb0">
      <i className="icon icon-spin6 animate-spin" />
    </p>
    <p className="align-center">
      <b>Chargement...</b>
    </p>
  </div>
);

const renderError = code => (
  <div id="assec-widget-event-window">
    <p className="align-center mb0">
      <i className="icon icon-emo-unhappy" />
    </p>
    <p className="align-center">
      <b>{`Erreur graphql code: (${code})`}</b>
    </p>
  </div>
);

class PageComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { code: null };
  }

  componentWillMount () {
    const parsed = queryString.parse(document.location.search);
    this.setState({ code: parsed.department || null });
  }

  render () {
    const { code } = this.state;
    const { step, popin, welcome } = this.props;
    if (!code) return renderError(404);
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} variables={{ code }}>
        {({ loading, error, data }) => {
          if (!error && (!data || loading)) return renderLoader();
          if (error) return renderError(500);
          const widget = (data && data.widget) || null;
          const questions = (widget && widget.questions) || null;
          const total = questions.length;
          const bodyclass = `current-step-${step} ${((welcome || popin) &&
            'haspopin') ||
            ''}`;
          return (
            <React.Fragment>
              <Helmet>
                <body className={bodyclass} />
                <title>Assec{usedebug() ? ' | Development' : ''}</title>
              </Helmet>
              <Form onSubmit={noop}
                validate={buildValidator(questions)}
                initialValues={{
                  department: (data.widget && data.widget.department) || null,
                }}
                render={({ values, invalid, handleSubmit }) => {
                  const question = (questions && questions[step]) || null;
                  const map = (widget && widget.map) || null;
                  const isfirst = step === 0;
                  const isresult = total <= step;
                  const islast = step === total - 1;
                  const formValue = (question && values[question.type]) || null;
                  // la premiere valeur est le field hidden department
                  const canforward = Object.keys(values).length > step + 1;
                  return (
                    <React.Fragment>
                      {!isresult && (
                        <React.Fragment>
                          {/* <WidgetSummary questions={questions} values={values}  /> */}
                          <WidgetHeader isfirst={isfirst}
                            title={question.title}
                            description={question.description} />
                          <form onSubmit={handleSubmit}>
                            <Field name="department"
                              type="hidden"
                              component="input" />
                            <WidgetSurvey map={map}
                              question={question}
                              formValue={formValue} />
                            {!isfirst && (
                              <WidgetNavigation islast={islast}
                                cansubmit={!invalid}
                                canforward={canforward} />
                            )}
                          </form>
                        </React.Fragment>
                      )}
                      {popin && (
                        <WidgetPopin {...question}
                          step={step}
                          islast={islast}
                          isfirst={isfirst} />
                      )}
                      {welcome && <WidgetWelcome />}
                      {isresult && <WidgetResult values={values} />}
                    </React.Fragment>
                  );
                }} />
              <WidgetFooter total={total} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

PageComponent.defaultProps = {
  form: null,
};

PageComponent.propTypes = {
  form: PropTypes.object,
  step: PropTypes.number.isRequired,
  welcome: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  popin: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default connect(state => ({
  step: state.step,
  popin: state.popin,
  welcome: state.welcome,
}))(PageComponent);
