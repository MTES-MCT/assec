import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = ({ title, subtitle }) => (
  <div id="app-header" className="relative">
    <h1 className="acenter title">
      {/* <i className="icon icon-droplet" /> */}
      <span>{title}</span>
    </h1>
    <h6 className="acenter subtitle">
      <small>{subtitle}</small>
    </h6>
    <span id="selecteur-departement">
      <span>Var</span>
      <i className="icon icon-down-open-mini" />
    </span>
  </div>
);

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AppHeader;
