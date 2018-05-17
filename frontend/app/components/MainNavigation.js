import React from 'react';
import PropTypes from 'prop-types';

import { TextLink, ButtonLink } from './ui/Links';

class MainNavigation extends React.PureComponent {
  render () {
    const { style, distanceFromTop } = this.props;
    const issticky = distanceFromTop;
    const padscl = (issticky && 'py12') || 'pt20';
    const stickycl = (issticky && 'issticky') || '';
    const csscl = `padded flex-columns flex-between flex-0 ${padscl} ${stickycl}`;
    const mergedstyles = Object.assign({}, style || {}, {
      left: 0,
      right: 0,
      width: '100%',
    });
    return (
      <div id="main-navigation" style={mergedstyles} className={csscl}>
        <div className="col-left flex-columns flex-start items-center">
          <img alt="La fabrique numérique"
            height="100"
            className="mr20"
            src="/static/logo-fabnum.svg" />
          <img alt="beta.gouv.fr"
            height="40"
            className="mr20"
            src="/static/logo-betagouv.svg" />
        </div>
        <div className="col-right flex-columns flex-end items-center">
          <nav>
            <TextLink to="a-propos"
              className="mr7"
              spy
              smooth
              hashSpy
              offset={-160}
              duration={500}
              activeClass="active">
              <span>A Propos</span>
            </TextLink>
            <span className="nav-splitter" />
            <TextLink to="comment-participer"
              className="mr7"
              spy
              smooth
              hashSpy
              offset={-180}
              duration={500}
              activeClass="active">
              <span>Nous Contacter</span>
            </TextLink>
            <ButtonLink to="essayez-la-demo"
              spy
              hashSpy
              smooth
              offset={-80}
              duration={800}
              className="demo-button large">
              <span>Essayer la démo</span>
              <i className="icon icon-thumbs-up ml7" />
            </ButtonLink>
            {/* <ButtonLink to="essayez-la-demo"
              spy
              hashSpy
              smooth
              offset={-80}
              duration={800}
              className="demo-button">
              <span>Essayer la démo</span>
              <i className="icon icon-thumbs-up ml7" />
            </ButtonLink> */}
          </nav>
        </div>
      </div>
    );
  }
}

MainNavigation.defaultProps = {
  style: null,
  distanceFromTop: null,
};

MainNavigation.propTypes = {
  style: PropTypes.object,
  distanceFromTop: PropTypes.number,
};

export default MainNavigation;
