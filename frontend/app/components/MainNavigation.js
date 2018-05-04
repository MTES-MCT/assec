import React from 'react';
import PropTypes from 'prop-types';

import { TextLink, ButtonLink } from './ui/Links';

const MainNavigation = ({ style, distanceFromTop }) => {
  const issticky = distanceFromTop;
  const padscl = (issticky && 'py20') || 'pt20';
  const stickycl = (issticky && 'issticky') || '';
  const margin = distanceFromTop >= -60 ? -170 : 0;
  // const margin = distanceFromTop >= -150 ? -170 : -170 - (distanceFromTop + 150);
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
          height="40"
          className="mr20"
          src="/static/logo-fabnum.svg" />
        <img alt="beta.gouv.fr"
          height="30"
          className="mr20"
          src="/static/logo-betagouv.svg" />
      </div>
      <div className="col-right flex-columns flex-end items-center">
        <nav style={{ marginRight: (margin < 0 && margin) || 0 }}>
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
            <span>Comment participer</span>
          </TextLink>
          <span className="nav-splitter" />
          <TextLink to="qui-sommes-nous"
            className="mr7"
            spy
            smooth
            hashSpy
            offset={-80}
            duration={1000}
            activeClass="active">
            <span>Nous contacter</span>
          </TextLink>
          <ButtonLink to="essayez-la-demo"
            spy
            hashSpy
            smooth
            offset={-80}
            duration={800}
            className="demo-button">
            <span>Essayer la démo</span>
            <i className="icon icon-thumbs-up ml7" />
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
};

MainNavigation.defaultProps = {
  style: null,
  distanceFromTop: null,
};

MainNavigation.propTypes = {
  style: PropTypes.object,
  distanceFromTop: PropTypes.number,
};

export default MainNavigation;
