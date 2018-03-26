import React from 'react';
import PropTypes from 'prop-types';

const AppFooter = ({ version }) => (
  <div id="app-footer" className="flex-columns flex-between">
    <div className="">
      <span>v{version}</span>
    </div>
    <div className="">
      <a href="http://geojson.io">GeoJSON.io</a>
    </div>
  </div>
);

AppFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default AppFooter;
