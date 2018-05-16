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
import WidgetFooter from './components/WidgetFooter';
import WidgetResult from './components/WidgetResult';
import WidgetSurvey from './components/WidgetSurvey';

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
    const { step, popin } = this.props;
    if (!code) return <p>Erreur le code est manquant :(</p>;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} variables={{ code }}>
        {({ loading, error, data }) => {
          if (!error && (!data || loading)) return <p>Loading...</p>;
          if (error) return <p>Erreur graphql :(</p>;
          const widget = (data && data.widget) || null;
          const questions = (widget && widget.questions) || null;
          const total = questions.length;
          return (
            <React.Fragment>
              <Helmet>
                <body className={`current-step-${step}`} />
                <title>Assec{usedebug() ? ' | Development' : ''}</title>
              </Helmet>
              {/* <WidgetSummary questions={questions} /> */}
              <Form onSubmit={noop}
                initialValues={{
                  department: (data.widget && data.widget.department) || null,
                }}
                render={({ values, handleSubmit }) => {
                  const question = (questions && questions[step]) || null;
                  const map = (widget && widget.map) || null;
                  const showresult = total <= step;
                  const isfirst = step === 0;
                  const islast = step === total - 1;
                  const formValue = (question && values[question.type]) || null;
                  return (
                    <React.Fragment>
                      <Field name="department"
                        type="hidden"
                        component="input" />
                      <WidgetSurvey map={map}
                        question={question}
                        formValue={formValue}
                        handleSubmit={handleSubmit} />
                      {popin && (
                        <WidgetPopin {...question}
                          step={step}
                          islast={islast}
                          isfirst={isfirst} />
                      )}
                      {showresult && <WidgetResult values={values} />}
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
  popin: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default connect(state => ({
  step: state.step,
  popin: state.popin,
}))(PageComponent);
