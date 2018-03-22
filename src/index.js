import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import { configure } from './store';

// pages
import MockupHeader from './components/mockup/MockupHeader';
import MockupStepper from './components/mockup/MockupStepper';
import MockupUserCase from './components/mockup/MockupUserCase';

const Page = () => (
  <div id="app-container" className="flex-rows">
    <Helmet>
      <title>Assec</title>
    </Helmet>
    <div id="main-container">
      <MockupHeader />
      <div id="main-content" className="flex-columns">
        <MockupStepper />
        <MockupUserCase />
      </div>
    </div>
  </div>
);

Page.propTypes = {};

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
