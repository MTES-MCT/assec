import React from 'react';
import PropTypes from 'prop-types';
import { ScrollLink } from 'react-scroll';

const LinkComponent = ({ children, ...rest }) => <a {...rest}>{children}</a>;

LinkComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const Link = ScrollLink(LinkComponent);

const MainNavigation = () => (
  <div id="main-navigation"
    className="flex-columns flex-between flex-0 py20 mb40">
    <div className="logos flex-columns flex-start items-center flex-0">
      <img alt="La fabrique numérique"
        height="30"
        src="/static/logo-fabnum.svg" />
      <img alt="beta.gouv.fr"
        height="20"
        className="ml20"
        src="/static/logo-betagouv.svg" />
    </div>
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
  </div>
);
MainNavigation.propTypes = {};
export default MainNavigation;
