import React from 'react';
// import PropTypes from 'prop-types';
import getConfig from 'next/config';
// import { graphql } from 'react-apollo';
import { Element } from 'react-scroll';
import withRedux from 'next-redux-wrapper';
import { StickyContainer, Sticky } from 'react-sticky';

// application
import './../scss/styles.scss';
// import { RETRIEVE_BLOCKS } from './../app/apolloql';
import configure from './../app/store';
import { Logger } from './../app/core/logger';
import withApollo from './../app/core/withApollo';
import Toaster from './../app/components/Toaster';
import MainFooter from './../app/components/MainFooter';
import DocumentHead from './../app/components/DocumentHead';
import ShadowLiner from './../app/components/ui/ShadowLiner';
import HeroContainer from './../app/components/HeroContainer';
import MainNavigation from './../app/components/MainNavigation';

// blocks
import Equipe from './../app/components/blocks/Equipe';
import Pourquoi from './../app/components/blocks/Pourquoi';
import NosSponsors from './../app/components/blocks/NosSponsors';
import ContactezNous from './../app/components/blocks/ContactezNous';
import QueFaisonsNous from './../app/components/blocks/QueFaisonsNous';
import CommentParticiper from './../app/components/blocks/CommentParticiper';

const { publicRuntimeConfig: envconfig } = getConfig();

Logger.debug(`
  **** Widget Application Debug ****
  REACT_APP_VERSION => ${envconfig.appversion}
  REACT_APP_WIDGET_URI => ${envconfig.widgeturi}
  REACT_APP_GRAPHQL_URI => ${envconfig.graphqluri}
`);

const Application = () => (
  <StickyContainer id="site-container" className="sticky-container">
    <DocumentHead pagetitle="Home" />
    <div id="top-container" className="padded flex-rows flex-between">
      <Sticky>{stickyprops => <MainNavigation {...stickyprops} />}</Sticky>
      <HeroContainer />
    </div>
    <div id="lames-container" className="pb120">
      <Pourquoi />
      <QueFaisonsNous />
      <CommentParticiper />
    </div>
    <Element name="essayez-la-demo">
      <iframe title="assec-widget"
        id="demo"
        border="0"
        height="520"
        width="100%"
        frameBorder="0"
        src={envconfig.widgeturi} />
    </Element>
    <Element name="qui-sommes-nous"
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
    <Toaster />
  </StickyContainer>
);

// const blocksToObject = blocks =>
//   blocks.reduce((acc, obj) => ({ ...acc, [obj.slug]: obj }), {});
//
// Application.propTypes = {
//   blocks: PropTypes.object.isRequired,
// };
//
// const ApolloApp = graphql(RETRIEVE_BLOCKS, {
//   options: { variables: {} },
//   props: ({ data }) => {
//     const parsed =
//       !data || !data.retrieveBlocks ? {} : blocksToObject(data.retrieveBlocks);
//     return { blocks: parsed };
//   },
// })(Application);

const withClient = withApollo(props => <Application {...props} />);

const connected = withRedux(configure)(withClient);

export default connected;
