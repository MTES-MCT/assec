import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = ({ title }) => (
  <div id="application-header" className="relative">
    <h1 className="title">
      <span>{title}</span>
    </h1>
  </div>
);

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
