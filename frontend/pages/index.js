import React from 'react';
import Head from 'next/head';
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

console.log('process.env.USE_DEBUG', process.env.USE_DEBUG);
console.log('process.env.WIDGET_URI', process.env.WIDGET_URI);
console.log('process.env.GRAPHQL_URI', process.env.GRAPHQL_URI);
console.log('process.env.APP_VERSION', process.env.APP_VERSION);

const App = () => (
  <div id="site-container">
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
      <link rel="stylesheet"
        href="/static/fontello/css/fontello-embedded.css" />
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
      <iframe title="assec-widget"
        id="demo"
        border="0"
        height="520"
        width="100%"
        frameBorder="0"
        src={process.env.WIDGET_URI} />
    </Element>
    <BottomBlocks />
    <div id="bottom-container">
      <MainFooter />
    </div>
  </div>
);

export default withRedux(configure)(App);
