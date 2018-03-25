import React from 'react';
import PropTypes from 'prop-types';

const AppFooter = ({ version }) => (
  <div id="app-footer">
    <span>v{version}</span>
  </div>
);

AppFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default AppFooter;
