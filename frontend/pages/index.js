import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { Element } from 'react-scroll';
import withRedux from 'next-redux-wrapper';

// application
import './../scss/styles.scss';
import configure from './../app/store';
import PageLames from './../app/components/PageLames';
import MainFooter from './../app/components/MainFooter';
import DemoButton from './../app/components/DemoButton';
import BottomBlocks from './../app/components/BottomBlocks';
import HeroContainer from './../app/components/HeroContainer';
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
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
      />
      <link
        rel="stylesheet"
        href="/static/fontello/css/fontello-embedded.css"
      />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <hr className="liner" />
    <div id="top-container" className="padded flex-rows flex-between">
      <MainNavigation />
      <HeroContainer />
      <DemoButton />
    </div>
    <PageLames />
    <Element name="demo" className="element">
      <iframe
        title="assec-widget"
        id="demo"
        border="0"
        height="520"
        width="100%"
        frameBorder="0"
        src={envconfig.widgeturi}
      />
    </Element>
    <BottomBlocks />
    <div id="bottom-container">
      <MainFooter version={envconfig.appversion} />
    </div>
  </div>
);

export default withRedux(configure)(App);
