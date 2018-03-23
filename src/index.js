import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import { configure } from './store';

// pages
import AppForm from './components/mockup/AppForm';
import AppHeader from './components/mockup/AppHeader';
import AppSidebar from './components/mockup/AppSidebar';
import StepperProgress from './components/mockup/stepper/StepperProgress';

const PageComponent = () => (
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
      <AppForm />
    </div>
    <div id="app-footer" />
  </div>
);

PageComponent.propTypes = {};

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageComponent />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
