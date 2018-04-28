import React from 'react';

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
      <a href="#lame-why">
        <span>A propos</span>
      </a>
      <span className="nav-splitter" />
      <a href="#lame-how" className="pl20">
        <span>Comment participer</span>
      </a>
      <span className="nav-splitter" />
      <a href="#bottom-blocks" className="pl20">
        <span>Nous contacter</span>
      </a>
    </nav>
  </div>
);
MainNavigation.propTypes = {};
export default MainNavigation;
