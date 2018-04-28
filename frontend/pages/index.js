import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';

// application
import './../scss/styles.scss';
import configure from './../app/store';
import PageLames from './../app/components/PageLames';
import MainFooter from './../app/components/MainFooter';
import BottomBlocks from './../app/components/BottomBlocks';
import HeroContainer from './../app/components/HeroContainer';
import MainNavigation from './../app/components/MainNavigation';

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
    </div>
    <PageLames />
    <BottomBlocks />
    <div id="bottom-container">
      <MainFooter />
    </div>
  </div>
);

export default withRedux(configure)(App);
