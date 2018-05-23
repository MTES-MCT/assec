import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { connect } from 'react-redux';
// import queryString from 'query-string';

// application
import { usedebug } from './core/usedebug';
import { parseQuery } from './core/parse-query';
import WidgetForm from './components/WidgetForm';
import WidgetHeader from './components/WidgetHeader';
import WidgetFooter from './components/WidgetFooter';
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
      step, popin, welcome, ismobile, istablet,
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
          <WidgetForm code={code} />
          <WidgetFooter code={code} />
        </div>
        {welcome && <WelcomePopin />}
      </React.Fragment>
    );
  }
}

Widget.defaultProps = {
  form: null,
};

Widget.propTypes = {
  step: PropTypes.number.isRequired,
  ismobile: PropTypes.bool.isRequired,
  istablet: PropTypes.bool.isRequired,
  welcome: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  popin: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const connected = connect(state => ({
  step: state.step,
  popin: state.popin,
  welcome: state.welcome,
}))(Widget);

export default withSizes(({ width }) => ({
  ismobile: width < 480,
  istablet: width >= 480 && width < 1024,
}))(connected);
