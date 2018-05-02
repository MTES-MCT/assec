import React from 'react';
import PropTypes from 'prop-types';
import { ScrollLink } from 'react-scroll';

import DemoButton from './ui/DemoButton';

const LinkComponent = ({ children, ...rest }) => <a {...rest}>{children}</a>;

LinkComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const Link = ScrollLink(LinkComponent);

const MainNavigation = ({ style, distanceFromTop }) => {
  const issticky = distanceFromTop;
  const showdemobtn = distanceFromTop <= -510;
  const padscl = (issticky && 'py12') || 'pt20';
  const stickycl = (issticky && 'issticky') || '';
  const csscl = `padded flex-columns flex-between flex-0 ${padscl} ${stickycl}`;
  const mergedstyles = Object.assign({}, style, {
    left: 0,
    right: 0,
    width: '100%',
  });
  return (
    <div id="main-navigation" style={mergedstyles} className={csscl}>
      <div className="logos flex-columns flex-start items-center flex-0">
        <img alt="La fabrique numérique"
          height="30"
          src="/static/logo-fabnum.svg" />
        <img alt="beta.gouv.fr"
          height="20"
          className="ml20"
          src="/static/logo-betagouv.svg" />
      </div>
      <div className="flex-columns flex-end items-center">
        <nav>
          <Link to="a-propos" spy hashSpy smooth offset={-80} duration={500}>
            <span>A propos</span>
          </Link>
          <span className="nav-splitter" />
          <Link to="comment-participer"
            spy
            hashSpy
            smooth
            duration={500}
            className="pl20">
            <span>Comment participer</span>
          </Link>
          <span className="nav-splitter" />
          <Link to="qui-sommes-nous"
            spy
            hashSpy
            smooth
            duration={1000}
            className="pl20">
            <span>Nous contacter</span>
          </Link>
        </nav>
        {(issticky && showdemobtn && <DemoButton className="ml20" />) || null}
      </div>
    </div>
  );
};

MainNavigation.defaultProps = {
  distanceFromTop: null,
};

MainNavigation.propTypes = {
  distanceFromTop: PropTypes.number,
  style: PropTypes.object.isRequired,
};

export default MainNavigation;
