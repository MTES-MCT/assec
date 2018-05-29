import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { usedebug } from './core/usedebug';
import { parseQuery } from './core/parse-query';
import { LOAD_DEPARTMENT_WIDGET } from './apolloql/queries';
import WidgetHeader from './components/WidgetHeader';
import WidgetFooter from './components/WidgetFooter';
import WidgetResults from './components/WidgetResults';
import WidgetQuestions from './components/WidgetQuestions';
import WelcomePopin from './components/popins/WelcomePopin';

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

class Widget extends React.Component {
  constructor (props) {
    super(props);
    this.state = { code: null };
  }

  componentWillMount () {
    const { search = null } = document.location;
    const parsed = parseQuery(search);
    this.setState({ code: (parsed && parsed.department) || null });
  }

  render () {
    const { code } = this.state;
    const {
      step, choices, popin, welcome, ismobile, istablet,
    } = this.props;
    if (!code) return renderError(404);
    const stepclass = `current-step-${step}`;
    const popinclass = `${((welcome || popin) && 'haspopin') || ''}`;
    const responsiveclass =
      (ismobile && 'mobile') || (istablet && 'tablet') || '';
    return (
      <React.Fragment>
        <Helmet>
          <body className={`${stepclass} ${popinclass} ${responsiveclass}`} />
          <title>Assec{usedebug() ? ' | Development' : ''}</title>
        </Helmet>
        <div id="assec-widget" className="flex-rows flex-between p20">
          <WidgetHeader code={code} />
          <Query query={LOAD_DEPARTMENT_WIDGET}
            skip={!code}
            variables={{ code }}>
            {({ loading, error, data }) => {
              if (error || !data.widget || loading) return <p>...</p>;
              const { questions, department } = data.widget;
              const initialValues = { department };
              return (
                <div id="assec-widget-content" className="flex-rows flex-1">
                  <WidgetQuestions step={step}
                    choices={choices}
                    questions={questions}
                    initialValues={initialValues} />
                  {choices && (
                    <WidgetResults choices={choices} questions={questions} />
                  )}
                </div>
              );
            }}
          </Query>
          <WidgetFooter code={code} />
        </div>
        {welcome && <WelcomePopin />}
      </React.Fragment>
    );
  }
}

Widget.defaultProps = {
  form: null,
  choices: null,
};

Widget.propTypes = {
  choices: PropTypes.object,
  step: PropTypes.number.isRequired,
  ismobile: PropTypes.bool.isRequired,
  istablet: PropTypes.bool.isRequired,
  welcome: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  popin: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const connected = connect(state => ({
  step: state.step,
  popin: state.popin,
  choices: state.choices,
  welcome: state.welcome,
}))(Widget);

export default withSizes(({ width }) => ({
  ismobile: width < 480,
  istablet: width >= 480 && width < 1024,
}))(connected);
