import React from 'react';
import PropTypes from 'prop-types';

// application
const Preloader = props => (
  <div id="preloader">
    <div className={`loader ${!props.loading ? '' : 'loading'}`} />
  </div>
);

Preloader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Preloader;
