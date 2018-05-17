import React from 'react';
import PropTypes from 'prop-types';

const DemoPopup = ({ opened }) => (
  <div id="demo-popup" className={opened ? 'opened' : ''}>
    <div className="overlay" />
    <div className="container">
      <div className="inner" />
    </div>
  </div>
);

DemoPopup.propTypes = {
  opened: PropTypes.bool.isRequired,
};

export default DemoPopup;
