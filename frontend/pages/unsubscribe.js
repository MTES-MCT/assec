import React from 'react';
import getConfig from 'next/config';
import withRedux from 'next-redux-wrapper';

// application
import './../scss/styles.scss';
import configure from './../app/store';
import MainFooter from './../app/components/MainFooter';
import DocumentHead from './../app/components/DocumentHead';
import MainNavigation from './../app/components/MainNavigation';

const { publicRuntimeConfig: envconfig } = getConfig();

// if (envconfig.usedebug) {
/* eslint-disable */
console.log('**** Frontend Application Debug ****');
console.log('USE_DEBUG', envconfig.usedebug);
console.log('REACT_APP_VERSION', envconfig.appversion);
console.log('REACT_APP_WIDGET_URI', envconfig.widgeturi);
console.log('REACT_APP_GRAPHQL_URI', envconfig.graphqluri);
/* eslint-disable */
// }

const App = () => (
  <div id="site-container">
    <DocumentHead pagetitle="Unsubscribe" />
    <div id="top-container" className="padded flex-rows flex-between">
      <MainNavigation />
    </div>
    <MainFooter version={envconfig.appversion} />
  </div>
);

export default withRedux(configure)(App);
