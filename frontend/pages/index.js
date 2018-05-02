import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { Element } from 'react-scroll';
import withRedux from 'next-redux-wrapper';
import { StickyContainer, Sticky } from 'react-sticky';

// application
import './../scss/styles.scss';
import configure from './../app/store';
import MainFooter from './../app/components/MainFooter';
import DemoButton from './../app/components/ui/DemoButton';
import ShadowLiner from './../app/components/ui/ShadowLiner';
import HeroContainer from './../app/components/HeroContainer';
import MainNavigation from './../app/components/MainNavigation';

// blocks
import Equipe from './../app/components/blocks/Equipe';
import APropos from './../app/components/blocks/APropos';
import NosSponsors from './../app/components/blocks/NosSponsors';
import ContactezNous from './../app/components/blocks/ContactezNous';
import QueFaisonsNous from './../app/components/blocks/QueFaisonsNous';
import CommentParticiper from './../app/components/blocks/CommentParticiper';

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
  <StickyContainer id="site-container" className="sticky-container">
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
      <Sticky>{stickyprops => <MainNavigation {...stickyprops} />}</Sticky>
      <HeroContainer />
      <DemoButton />
    </div>
    <div id="lames-container" className="py80">
      <APropos />
      <QueFaisonsNous />
      <CommentParticiper />
    </div>
    <Element name="essayez-la-demo">
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
    <Element
      name="qui-sommes-nous"
      id="qui-sommes-nous"
      className="padded pb60">
      <ShadowLiner className="mb40" />
      <div className="flex-columns flex-between">
        <ContactezNous />
        <Equipe />
      </div>
      <NosSponsors />
    </Element>
    <MainFooter version={envconfig.appversion} />
  </StickyContainer>
);

export default withRedux(configure)(App);
