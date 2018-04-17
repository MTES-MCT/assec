import React from 'react';
import PropTypes from 'prop-types';

const AppFooter = ({ version }) => (
  <div id="app-footer" className="align-right p12">
    <div className="left">
      <span>v{version}</span>
    </div>
  </div>
);

AppFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default AppFooter;
