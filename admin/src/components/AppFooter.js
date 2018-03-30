import React from 'react';
import PropTypes from 'prop-types';
import { debug } from 'assec-utils';

// application

const AppFooter = ({ version }) => (
  <div id="app-footer" className="flex-columns flex-between">
    <div className="left">
      <span>v{version}</span>
    </div>
    <div className="right">
      {debug() && (
        <a target="_blank"
          rel="noopener noreferrer"
          href="http://assec.iziges.fr">
          Demo
        </a>
      )}
      <a href="http://geojson.io">GeoJSON.io</a>
    </div>
  </div>
);

AppFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default AppFooter;
