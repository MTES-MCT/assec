import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import { configure } from './store';

// pages
import AppForm from './components/mockup/AppForm';
import AppHeader from './components/mockup/AppHeader';
import AppResults from './components/mockup/AppResults';
import AppSidebar from './components/mockup/AppSidebar';
import FormNavigation from './components/mockup/forms/FormNavigation';
import StepperProgress from './components/mockup/stepper/StepperProgress';

const PageComponent = ({ showresults }) => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec</title>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto" />
    </Helmet>
    <AppHeader />
    <StepperProgress />
    <div id="app-content" className="flex-columns">
      <AppSidebar />
      <div id="stepper-form" className="column flex4">
        <AppForm />
        {showresults && <AppResults />}
        <FormNavigation />
      </div>
    </div>
    <div id="app-footer" />
  </div>
);

PageComponent.propTypes = {
  showresults: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ activestep, fields }) => {
  const showresults =
    fields && fields.length > 0 && activestep === fields.length;
  return { showresults };
};

const Page = connect(mapStateToProps)(PageComponent);

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Page />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
