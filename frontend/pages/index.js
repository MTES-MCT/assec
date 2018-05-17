import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import withRedux from 'next-redux-wrapper';
import { StickyContainer, Sticky } from 'react-sticky';

// application
import './../scss/styles.scss';
import configure from './../app/store';
import { Logger } from './../app/core/logger';
import withApollo from './../app/core/withApollo';
import Toaster from './../app/components/Toaster';
import DemoPopup from './../app/components/DemoPopup';
import MainFooter from './../app/components/MainFooter';
import DocumentHead from './../app/components/DocumentHead';
import ShadowLiner from './../app/components/ui/ShadowLiner';
import HeroContainer from './../app/components/HeroContainer';
import MainNavigation from './../app/components/MainNavigation';

// blocks
import Equipe from './../app/components/blocks/Equipe';
import Pourquoi from './../app/components/blocks/Pourquoi';
import NosSponsors from './../app/components/blocks/NosSponsors';
import QueFaisonsNous from './../app/components/blocks/QueFaisonsNous';
import CommentParticiper from './../app/components/blocks/CommentParticiper';

const { publicRuntimeConfig: envconfig } = getConfig();

Logger.debug(`
  **** Widget Application Debug ****
  REACT_APP_VERSION => ${envconfig.appversion}
  REACT_APP_WIDGET_URI => ${envconfig.widgeturi}
  REACT_APP_GRAPHQL_URI => ${envconfig.graphqluri}
`);

class Application extends React.PureComponent {
  render () {
    const { popin } = this.props;
    return (
      <React.Fragment>
        <StickyContainer id="site-container"
          className={`sticky-container ${popin ? 'opened' : ''}`}>
          <DocumentHead pagetitle="Home" />
          <div id="top-container" className="padded flex-rows flex-between">
            <Sticky>
              {stickyprops => <MainNavigation {...stickyprops} />}
            </Sticky>
            <HeroContainer />
          </div>
          <div id="lames-container" className="pb120">
            <Element name="a-propos">
              <Pourquoi />
              <QueFaisonsNous />
            </Element>
            <CommentParticiper />
          </div>
          <Element name="qui-sommes-nous"
            id="qui-sommes-nous"
            className="padded pb120">
            <ShadowLiner className="mb40" />
            <div className="flex-columns flex-between">
              <Equipe />
              <NosSponsors />
            </div>
          </Element>
          <MainFooter version={envconfig.appversion} />
          <Toaster />
        </StickyContainer>
        {popin && <DemoPopup />}
      </React.Fragment>
    );
  }
}

Application.propTypes = {
  popin: PropTypes.bool.isRequired,
};

const Connected = connect(({ popin }) => ({ popin }))(Application);

const withClient = withApollo(props => <Connected {...props} />);

const connected = withRedux(configure)(withClient);

export default connected;
